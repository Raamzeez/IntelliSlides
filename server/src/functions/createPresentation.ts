import { OAuth2Client } from "google-auth-library";
import { JSONClient } from "google-auth-library/build/src/auth/googleauth";
import iParameters from "../models/parameters";

/**
 * Creates a Google Slide presentation.
 * @param {string} title The presentation title.
 */
async function createPresentation(
  parameters: iParameters,
  auth: OAuth2Client | JSONClient
) {
  // const { GoogleAuth } = require("google-auth-library");
  const { google } = require("googleapis");

  const service = google.slides({ version: "v1", auth });
  try {
    const presentation = await service.presentations.create({
      title: parameters.title,
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
