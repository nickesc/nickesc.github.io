class Banner{
    constructor(bannerText, bannerId){
        this.bannerHtml = `
            <div class="bannerText" id="${bannerId}Text">
                ${bannerText}
            </div>
            <div style="display: flex; flex-direction: row; justify-content: space-between; gap: 2em; align-items: center;">
                <div class="bannerDismiss" style="font-size: .8em; cursor: pointer;" id="${bannerId}Dismiss">Dismiss</div>
                <div class="bannerClose" id="${bannerId}Close">X</div>
            </div>
        `
        this.banner = document.createElement("div")
        this.banner.id=bannerId
        this.banner.className="banner"
        this.banner.innerHTML=this.bannerHtml

        this.banner.querySelector(".bannerClose")
          .addEventListener("click", this.closeBanner.bind(this));
        this.banner.querySelector(".bannerDismiss")
          .addEventListener("click", this.dismissBanner.bind(this));

        document.body.appendChild(this.banner);
        this.banner.style.display="none";
    }

    loadBanner(){
        let dismissedBanners = JSON.parse(localStorage.getItem("dismissedBanners")) || []
        if(!dismissedBanners.includes(this.banner.id)){
            this.openBanner()
        }
    }

    openBanner(){
        this.banner.style.display="flex"
    }

    closeBanner(){
        this.banner.style.display="none"
    }

    dismissBanner(){
        localStorage.setItem("dismissedBanners", JSON.stringify([this.banner.id]))
        this.closeBanner()
    }
}

class FirefoxBanner extends Banner{

    constructor(){
        super("This site is know to have formatting issues on Firefox; all site functionality remains available", "ffBanner")

        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
            this.loadBanner();
        }
    }
}

class UnderConstructionBanner extends Banner{
    constructor(){
        super("This site is actively being rebuilt; it is quite old and in need of some love <3" +
            "<br> See the <a href='https://nickesc.github.io/input-terminal/documents/Demo.html' target='_blank'>input-terminal demo</a> for the next generation of the terminal on this site", "underConstructionBanner")
        this.loadBanner();
    }
}
