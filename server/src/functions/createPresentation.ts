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
  const slides = [];
  for (let i = 0; i < parameters.slideCount; i++) {
    slides.push({ pageType: "SLIDE" });
  }
  try {
    const presentation = await service.presentations.create({
      requestBody: {
        title: parameters.title,
        slides,
      },
    });
    console.log(
      `Created presentation with ID: ${presentation.data.presentationId}`
    );
    return presentation;
  } catch (err) {
    // TODO (developer) - Handle exception
    throw err;
  }
}

export default createPresentation;
