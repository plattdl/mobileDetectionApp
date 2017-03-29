/**
 * Class for info regarding sentinel scene info
 */

export type hemisphere = 'N' | 'S';

export class SentinelScene {
    thumbnailUri: string
    tileInfoUri: string
    metadataUri: string
    cloudCover: number
    tileCoverage: number
    extXmin: number
    extXmax: number
    extYmin: number
    extYmax: number
    extCoordinates: Array <any>
    epsg: number
    year: string
    month: string
    day: string
    hemisphere: hemisphere
    utmZone: number
}