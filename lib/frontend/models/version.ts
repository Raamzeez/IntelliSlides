import iUpdate from "./update"

interface iVersion {
    version: string
    isBeta: boolean
    date: string
    data: iUpdate[]
}

export default iVersion
