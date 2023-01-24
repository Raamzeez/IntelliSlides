import { OAuth2Client } from "google-auth-library";
import { JSONClient } from "google-auth-library/build/src/auth/googleauth";
import iParameters from "../models/parameters";
import { google } from "googleapis";
import { slides } from "googleapis/build/src/apis/slides";

/**
 * Creates a Google Slide presentation.
 * @param {string} title The presentation title.
 */
async function createPresentation(
  parameters: iParameters,
  auth: OAuth2Client | JSONClient
) {
  // const { GoogleAuth } = require("google-auth-library");
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
    const res = await service.presentations.batchUpdate({
      presentationId: presentation.data.presentationId,
      requestBody: {
        requests,
      },
    });
    console.log("Added slides to presentation!");
    return presentation;
  } catch (err) {
    // TODO (developer) - Handle exception
    throw err;
  }
}

export default createPresentation;
