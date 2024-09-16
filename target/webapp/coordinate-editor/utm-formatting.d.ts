type UTM = {
    easting: number;
    northing: number;
    zone: number;
    hemisphere: 'N' | 'S';
};
declare const utmToString: ({ easting, northing, zone, hemisphere }: UTM) => string;
export { UTM, utmToString };
