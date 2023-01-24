import { OAuth2Client } from "google-auth-library";
import { JSONClient } from "google-auth-library/build/src/auth/googleauth";
import iParameters from "../models/parameters";
import { google } from "googleapis";
import iSlideInfo from "../models/slideInfo";
import getImage from "./getImage";

/**
 * Creates a Google Slide presentation.
 * @param {string} title The presentation title.
 */
async function createPresentation(
  parameters: iParameters,
  auth: OAuth2Client | JSONClient,
  slidesInfo: iSlideInfo[],
  key: string,
  cx: string
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
    for (let i = 0; i < parameters.slideCount; i++) {
      requests.push({
        createSlide: {
          slideLayoutReference: {
            predefinedLayout: "TITLE_AND_BODY",
          },
        },
      });
    }
    if (parameters.sources) {
      requests.push({
        createSlide: {
          slideLayoutReference: {
            predefinedLayout: parameters.images
              ? "TITLE_AND_TWO_COLUMNS"
              : "TITLE_AND_BODY",
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
    const imageSources: string[] = [];
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
      if (parameters.images) {
        console.log(`Finding Image for ${slidesInfo[i].title}...`);
        const imageResponse = await getImage(slidesInfo[i].title, key, cx);
        const imageURL = imageResponse.items[0].link;
        const imageSource = imageResponse.items[0].image.contextLink;
        imageSources.push(imageSource);
        console.log(`Found image with url of ${imageURL} from ${imageSource}!`);
      }
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
    if (parameters.sources) {
      const slideObjectId =
        titleSlideResponse.data.replies[slidesInfo.length].createSlide.objectId;
      const slideObjectIds = await service.presentations.pages.get({
        presentationId: presentation.data.presentationId,
        pageObjectId: slideObjectId,
      });
      const headingId = slideObjectIds.data.pageElements[0].objectId;
      const firstBodyId = slideObjectIds.data.pageElements[1].objectId;
      let secondBodyId: string | null = null;
      if (parameters.images) {
        secondBodyId = slideObjectIds.data.pageElements[2].objectId;
      }
      requests.push({
        insertText: {
          objectId: headingId,
          text: "Sources",
        },
      });
      requests.push({
        insertText: {
          objectId: firstBodyId,
          text: "Article Sources Test",
        },
      });
      if (secondBodyId) {
        let body = "";
        imageSources.forEach((source) => (body += source += "\n"));
        requests.push({
          insertText: {
            objectId: secondBodyId,
            text: body,
          },
        });
      }
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
