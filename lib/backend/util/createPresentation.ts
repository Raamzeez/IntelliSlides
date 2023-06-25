import { OAuth2Client } from "google-auth-library"
import { JSONClient } from "google-auth-library/build/src/auth/googleauth"
import iParameters from "../models/parameters"
import { google } from "googleapis"
import iSlideInfo from "../../shared/models/slideInfo"
import getImage from "./getImage"
import getPrompts from "./prompts"

/**
 * Creates a Google Slide presentation.
 * @param {string} title The presentation title.
 */
async function createPresentation(
    parameters: iParameters,
    auth: OAuth2Client | JSONClient,
    slidesInfo: iSlideInfo[],
    key: string,
    cx: string,
    slideThemes: string // Array of theme IDs or names
) {
    const service = google.slides({ version: "v1", auth })
    try {
        const presentation = await service.presentations.create({
            requestBody: {
                title: parameters.title,
            },
        })
        const titleSlide = presentation.data.slides![0]
        const titleID = titleSlide.pageElements![0].objectId
        const subtitleID = titleSlide.pageElements![1].objectId
        const requests: any[] = []
        for (let i = 0; i < parameters.slideCount; i++) {
            const themeId = slideThemes[i] || '1a4xBohEM_kFThJ0n4LVZVroT69eND7sN5r4pH7U4KvI'; // Use a specific theme ID or name from the array
            requests.push({
                createSlide: {
                    slideLayoutReference: {
                        predefinedLayout: "TITLE_AND_BODY",
                    },
                    slideProperties: {
                        slideThemeObjectId: themeId,
                    },
                },
            })
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
            })
        }
        requests.push({
            insertText: {
                objectId: titleID,
                text: parameters.title,
            },
        })
        requests.push({
            insertText: {
                objectId: subtitleID,
                text: parameters.subtitle,
            },
        })
        const titleSlideResponse = await service.presentations.batchUpdate({
            presentationId: presentation.data.presentationId!,
            requestBody: {
                requests,
            },
        })
        requests.length = 0
        const imageSources: string[] = []
        for (let i = 0; i < slidesInfo.length; i++) {
            const slideObjectId =
                titleSlideResponse.data.replies![i].createSlide!.objectId
            const slideObjectIds = await service.presentations.pages.get({
                presentationId: presentation.data.presentationId!,
                pageObjectId: slideObjectId!,
            })
            const headingId = slideObjectIds.data.pageElements![0].objectId
            const bodyId = slideObjectIds.data.pageElements![1].objectId
            requests.push({
                insertText: {
                    objectId: headingId,
                    text: slidesInfo[i].title,
                },
            })
            if (parameters.images) {
                const imageResponse = await getImage(
                    getPrompts(
                        "image",
                        parameters.category,
                        parameters.slideCount,
                        slidesInfo[i].title,
                        parameters.topic
                    ),
                    key,
                    cx
                )
                if (imageResponse.items) {
                    const imageURL = imageResponse.items[0].link
                    const imageSource = imageResponse.items[0].image.contextLink
                    imageSources.push(imageSource)
                    const emu4M = {
                        magnitude: 4000000,
                        unit: "EMU",
                    }
                    if (imageURL && imageSource) {
                        requests.push({
                            createImage: {
                                url: imageURL,
                                elementProperties: {
                                    pageObjectId: slideObjectId,
                                    size: {
                                        height: emu4M,
                                        width: emu4M,
                                    },
                                    transform: {
                                        scaleX: 1,
                                        scaleY: 1,
                                        translateX: 100000,
                                        translateY: 100000,
                                        unit: "EMU",
                                    },
                                },
                            },
                        })
                    }
                }
            }
            let body = ""
            slidesInfo[i].facts.forEach((fact) => {
                body += fact += "\n"
            })
            requests.push({
                insertText: {
                    objectId: bodyId,
                    text: body,
                },
            })
        }
        if (parameters.sources) {
            const slideObjectId =
                titleSlideResponse.data.replies![slidesInfo.length].createSlide!
                    .objectId
            const slideObjectIds = await service.presentations.pages.get({
                presentationId: presentation.data.presentationId!,
                pageObjectId: slideObjectId!,
            })
            const headingId = slideObjectIds.data.pageElements![0].objectId
            const firstBodyId = slideObjectIds.data.pageElements![1].objectId
            let secondBodyId: string | null = null
            if (parameters.images) {
                secondBodyId = slideObjectIds.data.pageElements![2]
                    .objectId as string
            }
            requests.push({
                insertText: {
                    objectId: headingId,
                    text: "Sources",
                },
            })
            requests.push({
                insertText: {
                    objectId: firstBodyId,
                    text: "Article Sources Test",
                },
            })
            if (secondBodyId) {
                let body = ""
                imageSources.forEach((source) => (body += source += "\n"))
                requests.push({
                    insertText: {
                        objectId: secondBodyId,
                        text: body,
                    },
                })
            }
        }
        const addedSlidesResponse = await service.presentations.batchUpdate({
            presentationId: presentation.data.presentationId!,
            requestBody: {
                requests,
            },
        })
        const response = await service.presentations.pages.getThumbnail({
            presentationId: presentation.data.presentationId!,
            pageObjectId: presentation.data.slides![0].objectId!,
        })
        const presentationId = presentation.data.presentationId
        const title = parameters.title
        const subtitle = parameters.subtitle
        return {
            presentationId,
            topic: parameters.topic,
            title,
            subtitle,
            slideCount: parameters.slideCount,
            date: new Date(),
            thumbnail: response.data,
        }
    } catch (err) {
        // TODO (developer) - Handle exception
        throw err
    }
}

export default createPresentation
