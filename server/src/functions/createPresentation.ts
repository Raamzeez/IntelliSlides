import { OAuth2Client } from "google-auth-library";
import { JSONClient } from "google-auth-library/build/src/auth/googleauth";
import iParameters from "../models/parameters";
import { google } from "googleapis";
import iSlideInfo from "../models/slideInfo";

/**
 * Creates a Google Slide presentation.
 * @param {string} title The presentation title.
 */
async function createPresentation(
  parameters: iParameters,
  auth: OAuth2Client | JSONClient,
  slidesInfo: iSlideInfo[]
) {
  const service = google.slides({ version: "v1", auth });
  try {
    const presentation = await service.presentations.create({
      requestBody: {
        title: parameters.title,
      },
    });
    console.log(
      `Created presentation with ID: ${presentation.data.presentationId}`
    );
    const titleSlide = presentation.data.slides[0];
    const titleID = titleSlide.pageElements[0].objectId;
    const subtitleID = titleSlide.pageElements[1].objectId;
    const requests = [];
    for (let i = 0; i < parameters.slideCount + 1; i++) {
      requests.push({
        createSlide: {
          slideLayoutReference: {
            predefinedLayout:
              i < parameters.slideCount ? "TITLE_AND_BODY" : "TITLE",
          },
        },
      });
    }
    requests.push({
      insertText: {
        objectId: titleID,
        text: parameters.title,
      },
    });
    requests.push({
      insertText: {
        objectId: subtitleID,
        text: parameters.subtitle,
      },
    });
    const titleSlideResponse = await service.presentations.batchUpdate({
      presentationId: presentation.data.presentationId,
      requestBody: {
        requests,
      },
    });
    console.log("Added title slide and populated with correct info!");
    console.log(JSON.stringify(titleSlideResponse, null, 3));
    requests.length = 0;
    for (let i = 0; i < slidesInfo.length; i++) {
      const slideObjectId =
        titleSlideResponse.data.replies[i].createSlide.objectId;
      const slideObjectIds = await service.presentations.pages.get({
        presentationId: presentation.data.presentationId,
        pageObjectId: slideObjectId,
      });
      const headingId = slideObjectIds.data.pageElements[0].objectId;
      const bodyId = slideObjectIds.data.pageElements[1].objectId;
      requests.push({
        insertText: {
          objectId: headingId,
          text: slidesInfo[i].title,
        },
      });
      let body = "";
      slidesInfo[i].facts.forEach((fact) => {
        body += fact += "\n";
      });
      requests.push({
        insertText: {
          objectId: bodyId,
          text: body,
        },
      });
    }
    const addedSlidesResponse = await service.presentations.batchUpdate({
      presentationId: presentation.data.presentationId,
      requestBody: {
        requests,
      },
    });
    console.log("Added slides to presentation and populated with info!");
    return presentation;
  } catch (err) {
    // TODO (developer) - Handle exception
    throw err;
  }
}

export default createPresentation;
