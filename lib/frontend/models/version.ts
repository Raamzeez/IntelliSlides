import iUpdate from "./update"

interface iVersion {
    version: string
    isBeta: boolean
    date: Date
    data: iUpdate[]
    policyChange?: boolean
}

export default iVersion
