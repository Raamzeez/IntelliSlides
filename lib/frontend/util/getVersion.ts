import versions from "../data/versions"
import iVersion from "../models/version"

const getVersion = (versionNumber: string): iVersion => {
    return versions.filter((version) => version.version === versionNumber)[0]
}

export default getVersion
