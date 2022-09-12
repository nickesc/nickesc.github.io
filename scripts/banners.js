class FirefoxBanner{

    constructor(FirefoxBanner){
        this.active = false;
        this.banner = document.createElement("div")
        this.bannerText = document.createElement("div")
        this.bannerClose = document.createElement("div")

        this.banner.className="banner"
        this.banner.id="ffBanner"
        this.bannerText.className="bannerText"
        this.bannerText.id="ffBannerText"
        this.bannerClose.className="bannerClose"
        this.bannerClose.id="ffBannerClose"
    
        this.bannerText.innerHTML="This site is know to have formatting issues on Firefox; all site functionality remains available"
        this.bannerClose.innerHTML="X"
    
        this.bannerClose.addEventListener("click", this.closeFirefoxBanner.bind(this));
        this.banner.appendChild(this.bannerText)
        this.banner.appendChild(this.bannerClose)

        document.body.appendChild(this.banner);
        this.banner.style.display="none"

        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
            this.openFirefoxBanner()
        }
    }

    openFirefoxBanner(){
        if(!this.active){
            this.banner.style.display="flex"
            this.active = true
        }
    }

    closeFirefoxBanner(){
        if(this.active){
            this.banner.style.display="none"
            this.active = false
        }
    }
}
