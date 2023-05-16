
interface PreviewSize  {
    width ?:number|string,
    height ?:number|string,
    maxWidth ?:number|string,
    maxHeight ?:number|string,
}

type FinalOutputSingle = string|File
type FinalOutputMulti = (string|File)[]

export {
    PreviewSize,
    FinalOutputSingle,
    FinalOutputMulti,
}