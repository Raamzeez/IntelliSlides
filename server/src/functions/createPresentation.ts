/**
 * Creates a Google Slide presentation.
 * @param {string} title The presentation title.
 */

async function createPresentation(title) {
  const { GoogleAuth } = require("google-auth-library");
  const { google } = require("googleapis");

  const auth = new GoogleAuth({
    scopes: [
      "https://www.googleapis.com/auth/presentations",
      "https://www.googleapis.com/auth/drive",
    ],
  });

  const service = google.slides({ version: "v1", auth });
  try {
    const presentation = await service.presentations.create({
      title,
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
