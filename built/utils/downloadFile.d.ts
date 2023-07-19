interface DownloadParams {
    filename: string;
    contents: string;
    contentType?: string;
}
declare const downloadFile: ({ filename, contents, contentType, }: DownloadParams) => void;
export default downloadFile;
