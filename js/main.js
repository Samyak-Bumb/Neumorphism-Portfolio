function bodyScrollingToggle(){
    document.body.classList.toggle("stop-scrolling")
}
// ======================== Nav Menu Section ======================== //
(()=>{
    const humBtn = document.querySelector(".menu"),
    navMenu = document.querySelector(".nav-menu"),
    closeMenuBtn =document.querySelector(".nav-menu-close");

    humBtn.addEventListener("click",showNavMenu);
    closeMenuBtn.addEventListener("click",hideNavMenu);
    function showNavMenu(){
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }
    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }
    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(()=>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        },300)
    }
    // Attach An Event Handler To Document
    document.addEventListener("click",(e)=>{
        if(e.target.classList.contains("link-item")){
            // Make Sure e.target.hash has a value before overriding default behavior
            if(e.target.hash !== ""){
                // prevent default anchor click behavior
                e.preventDefault();
                const hash = e.target.hash;
                // deactivate existing active "section"
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // activate new "section"
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                // deactivate existing active nav menu "link-item"
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active");
                // if clicked "link-item" is contained within the nav menu
                if(navMenu.classList.contains("open")){
                    // activate new nav menu link-item
                    e.target.classList.add("active");
                    e.target.classList.remove("outer-in-shadow","hover-in-outer");
                    // hide nav menu
                    hideNavMenu();
                }
                // if clicked "link-item" is not contained within the nav menu
                else{
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item)=>{
                        if(hash === item.hash){
                            // activate new nav menu link-item
                            item.classList.add("active");
                            item.classList.remove("outer-in-shadow","hover-in-outer");
                        }
                    });
                    fadeOutEffect();
                }
                window.location.hash = hash;
            }
        }
    });
})();
// ======================== About Section ======================== //
(() =>{
    // Set Variables
    const about_section = document.querySelector(".about-section"),
        about_tabs = document.querySelector(".about-tabs");
    // Add Click On Tabs
    about_tabs.addEventListener("click",(e) =>{

        // If e.target has "tab-item" class and not has "active" class
        if(e.target.classList.contains("tab-item") && !e.target.classList.contains("active")){
            // Get Attr From Element Clicked
            const target = e.target.getAttribute("data-target");
            // deactivate existing active "tab-item"
            about_tabs.querySelector(".active").classList.remove("active");
            // Activate New "tab-item"
            e.target.classList.add("active");
            // deactivate existing active "tab-content"
            about_section.querySelector(".tab-content.active").classList.remove("active");
            // Activate New "tab-content"
            about_section.querySelector(target).classList.add("active");
        }
    });
})();
// ======================== Portfolio Section ======================== //
(()=>{
    // Set Variables
    const
    filterContainer = document.querySelector(".portfolio-tabs"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popUp = document.querySelector(".portfolio-popup"),
    prevBtn = document.querySelector(".pp-prev"),
    nextBtn = document.querySelector(".pp-next"),
    closeBtn = document.querySelector(".pp-close"),
    project_details_container = document.querySelector(".pp-details"),
    projectDetailsBtn = document.querySelector(".pp-details-btn");
    let itemIndex, slideIndex, screenshots;
    // Filter Portfolio Items
    filterContainer.addEventListener("click",(e) =>{
        // If e.target has "tab-item" class and not has "active" class
        if(e.target.classList.contains("tab-item") && !e.target.classList.contains("active")){
            // deactivate existing active "filter-item"
            filterContainer.querySelector(".active").classList.remove("active");
            // Activate New "filter-item"
            e.target.classList.add("active");
            // Get Attr From Element Clicked
            const target = e.target.getAttribute("data-target");
            // Loop On All Portfolio Item
            portfolioItems.forEach((item)=>{
                // If Attr From Element Clicked = Attr From Item Or Attr From Element Clicked = all
                if(target == item.getAttribute("data-category") || target == "all"){
                    // Remove Hide On Item True
                    item.classList.remove("hide");
                    // Add Show On Item True
                    item.classList.add("show");
                }else{
                    // Remove Show On Item False
                    item.classList.remove("show");
                    // Add Hide On Item False
                    item.classList.add("hide")
                }
            })

        }
    });
    // Click On Item
    portfolioItemsContainer.addEventListener("click",(e)=>{
        // if Element Existing "portfolio-item-inner"
        if(e.target.closest(".portfolio-item-inner")){
            // Get The Parent Element
            const portfolioItem = e.target.closest(".portfolio-item-inner").parentElement;
            // Get The Portfolio Item Index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            // Get All Screenshots From All Elements
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshot");

            // Convert Screenshots Into Array
            screenshots = screenshots.split(",");
            // If Screenshots Length = 1
            if(screenshots.length === 1){
                // Display None On Next And Prev Btn
                nextBtn.style.display = "none";
                prevBtn.style.display = "none";
            }else{
                // Display Block On Next And Prev Btn
                nextBtn.style.display = "block";
                prevBtn.style.display = "block";
            }
            // Set slideIndex
            slideIndex = 0;
            // Run Function's
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    });
    // Add Event On Close Btn
    closeBtn.addEventListener("click",()=>{
        // Run Function Before Anything
        popupToggle()
        // If project_details_container Has Class Active
        if(project_details_container.classList.contains("active")){
            // Run Function To close the information
            popupDetailsToggle();
        }
    });
    // To Open And Close Project Details
    function popupToggle(){
        // Toggle Class "Open" On Popup
        popUp.classList.toggle("open");
        // Toggle Class "stop-scrolling" On Body
        bodyScrollingToggle();
    }
    // Set Slideshow And Set Preload Img
    function popupSlideshow(){
        // Set Img Src For Item
        const imgSrc = screenshots[slideIndex],
        // Select Img From Html
        popupImg = popUp.querySelector(".pp-img");
        // Activate Loader Before Img Loading
        popUp.querySelector(".pp-loader").classList.add("active");
        // Set Src Img From screenshots [slideIndex]
        popupImg.src = imgSrc;
        // Onload Img Remove Preload
        popupImg.onload = ()=>{
            // delete loader after img loading
            popUp.querySelector(".pp-loader").classList.remove("active");
        };
        // Set TextContent For Counter Slide
        popUp.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }
    // Next Slide
    nextBtn.addEventListener("click",()=>{
        // If Img For Slide = Last Img Set Current Img To First Img
        if(slideIndex === screenshots.length - 1){
            slideIndex = 0;
        }
        // Else Get Current Img And Plus Him one
        else{
            slideIndex++
        }
        // Run Function To Run Code Again To SlideShow
        popupSlideshow()
    });
    // Prev Slide
    prevBtn.addEventListener("click",()=>{
        // If Img For Slide <= First Img Set Current Img To Last Img
        if(slideIndex <= 0){
            slideIndex = screenshots.length - 1;
        }
        // Else Get Current Img And minus Him One
        else{
            slideIndex--
        }
        // Run Function To Run Code Again To SlideShow
        popupSlideshow()
    });
    // Function To Set Data For All Items
    function popupDetails(){
        // If Details For Item Clicked Not Available Don't Show Button For Details
        if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailsBtn.style.display = "none";
            // Don't make the function work
            return;
        }
        // If Details For Item Clicked Available Show Button For Details
        projectDetailsBtn.style.display = "block";
        // Get The Project Details
        const
        // Get Details For Every Single Item
        details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        // Get Title For Every Single Item
        const title = portfolioItems[itemIndex].querySelector(".portfolio-title").innerHTML;
        // Get Category For Every Single Item
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        // Get Popup Category To Write Inside It Category For Every Single Item And Remove "-"
        popUp.querySelector(".pp-title span").innerHTML = category.split("-").join(" ");
        // Get Popup Title To Write Inside It Title For Every Single Item
        popUp.querySelector(".pp-title h2").innerHTML = title;
        // Get Popup Details To Write Inside It Details For Every Single Item
        popUp.querySelector(".pp-project-details").innerHTML = details;
    }
    // on click on button for details run popupDetailsToggle function
    projectDetailsBtn.addEventListener("click",popupDetailsToggle);
    // Function To Set Height And Toggle Icon Btn And Toggle Class Active On project_details_container
    function popupDetailsToggle(){
        // If project_details_container Has Class "active"
        if(project_details_container.classList.contains("active")){
            // Remove Minus Icon On Button
            projectDetailsBtn.querySelector("i").classList.remove("bx-minus");
            // Add Plus Icon On Button
            projectDetailsBtn.querySelector("i").classList.add("bx-plus-medical");
            // Remove Class Active On project_details_container
            project_details_container.classList.remove("active");
            // Set project_details_container Height = 0
            project_details_container.style.maxHeight = 0 + "px"
        }else{
            // Remove Plus Icon On Button
            projectDetailsBtn.querySelector("i").classList.remove("bx-plus-medical");
            // Add Minus Icon On Button
            projectDetailsBtn.querySelector("i").classList.add("bx-minus");
            // Add Class Active On project_details_container
            project_details_container.classList.add("active");
            // Set project_details_container Height = project_details_container.scrollHeight
            project_details_container.style.maxHeight = project_details_container.scrollHeight + "px";
            // Set Scroll Top
            popUp.scrollTo(0,project_details_container.offsetTop);
        }
    }

})();
// ======================== Testimonial Section ======================== //

(()=>{

    const
    slideContainer = document.querySelector(".testi-slider-container"),
    slides = slideContainer.querySelectorAll(".testi-item"),
    slideWidth = slideContainer.offsetWidth,
    activateSlide = slideContainer.querySelector(".testi-item.active"),
    prevBtn = document.querySelector(".testi-slider-control .prev"),
    nextBtn = document.querySelector(".testi-slider-control .next");
    let slideIndex = Array.from(activateSlide.parentElement.children).indexOf(activateSlide);

    // Set Width Of All Slides
    slides.forEach((slide)=>{
        slide.style.width = slideWidth  + "px";
    });

    // Set Width Of slideContainer
    slideContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener("click",()=>{
        if(slideIndex === slides.length - 1){
            slideIndex = 0;
        }else{
            slideIndex++;
        }
        slider()
    });

    prevBtn.addEventListener("click",()=>{
        if(slideIndex === 0){
            slideIndex = slides.length - 1;
        }else{
            slideIndex--;
        }
        slider()
    })

    function slider(){
        slideContainer.querySelector(".testi-item.active").classList.remove("active");
        slides[slideIndex].classList.add("active")
        slideContainer.style.marginLeft =  - (slideWidth * slideIndex) + "px";
    }
    slider()

})();
// ======================== Hide All Sections Except Active ======================== //
(()=>{
    const sections = document.querySelectorAll(".section");
    sections.forEach((section)=>{
        if(!section.classList.contains("active")){
            section.classList.add("hide")
        }
    });
})();
// ======================== preloader Section ======================== //
window.addEventListener("load",()=>{
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(()=>{
        document.querySelector(".preloader").style.display = "none";
    },600)
});