export function clone(source) {
    return source++
}

export class ImgPreloader {

    static onProgress = "0";
    static fallbackImage = "";

    promiseLoad(images) {
        return new Promise((resolve, reject) =>{
            let img;
            // 判断是否是img 的实例
            if (images instanceof HTMLImageElement) {
                img = images;

                if (!img.complete) {
                    // 是否已经缓存
                    img.onload = resolve.bind(null, img);
                    img.onerror = img.onabort = reject.bind(null, img);
                } else if (img.naturalHeight) {

                    // 是否更新高度/默认高度
                    resolve(img);
                } else {
                    reject(img)
                }
            } else if (typeof images === 'string') {
                img = new Image();
                img.src = images;
                img.onload = resolve.bind(null, img);
                img.onerror = img.onabort = reject.bind(null, img);
            }
        })
    }
    preload(args) {
        const imgList = Array.prototype.concat.apply([], Array.prototype.slice.call(arguments))
        imgList.map(imgs => {
            return this.promiseLoad(imgs).catch((errorImg)=>{
                if (this.fallbackImage) {
                    
                    // 存在损坏/访问不同的url
                    return this.promiseLoad(this.fallbackImage).then(fallbackImage => {
                        errorImg.setAttribute('data-fail-src', errorImg.src);
                        errorImg.src = fallbackImage.src;
                        return errorImg
                    },()=>{
                        return Promise.reject(errorImg);
                    })
                }
                return Promise.reject(errorImg);
            })
        })

        return Promise.allSettled(imgList).then(res => {
            console.log(res,"res")
            return res
        })
    } 
}

