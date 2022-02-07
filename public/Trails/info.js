const trails = {
    chinatown : {
        name:"China Town",
        location:{lat:1.2822180475786821,lng:103.8444213709885},
        content:"",
        landmarks:
            [ 
                { 
                    name: "Chinatown Heritage Centre",
                    legend:'CHC',
                    location: { 
                         
                        lat: 1.2834358522886367, // add here latitude if using static data 
                        lng: 103.84440228835545, // add here longitude if using static data 
            
                    },
                    marker:'assets/chcmarker.png',
                    content:"Get transported back in time and experience the footsteps \n of migrants in the late 19th century of singapore",
                    src:'landmarks/chinatown/chinatownheritagecentre.html',
                    contentHTML :
                    '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h4>Chinatown Heritage Centre</h4>' +
                    '<div class="text-center" id="bodyContent">' +
                    '<h5>*Distance Away*</h5>'+
                    "<a href='main.html?CHC'><button class='btn btn-primary'>NAVIGATE</button></a>"+
                    "</div>" +
                    "</div>"
                },
                { 
                    name: "Sri Mariamman Temple",
                    legend:'SMT',
                    location:{ 
                        lat:1.2826974252118535, 
                        lng: 103.84513546864258,
                    },  
                    marker:'assets/smtmarker.png',
                    content:'This hindu temple is the oldest \n and largest of its kind in singapore',
                    src:'landmarks/chinatown/srimariamtemple.html',

                    contentHTML :
                    '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h4>Sri Maraimman Temple</h4>' +
                    '<div class="text-center" id="bodyContent">' +
                    '<h5>*Distance Away*</h5>'+
                    "<a href='main.html?SMT'><button class='btn btn-primary'>NAVIGATE</button></a>"+
                    "</div>" +
                    "</div>"
                }, 
                { 
                    name: "Masjid Jamae",
                    legend:'MJ',
                    location:{ 
                        
                        lat:1.2832659109590843,
                        lng: 103.84544660487347, 
                    },
                    marker:'assets/mjmarker.png',
                    content:'Established in 1826 it is one of the oldest mosque in \n singapore One of the only six in the \n country that conducts sermons in tamil' ,
                    src:'landmarks/chinatown/masjidjamae.html',
                    contentHTML :
                    '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h4>Masjid Jamae</h4>' +
                    '<div class="text-center" id="bodyContent">' +
                    '<h5>*Distance Away*</h5>'+
                    "<a href='main.html?MJ'><button class='btn btn-primary'>NAVIGATE</button></a>"+
                    "</div>" +
                    "</div>"
                }, 
                { 
                    name: "Tong Heng",
                    legend:'TH', 
                    location:{ 
                         
                        lat:1.2816404559768435, 
                        lng:103.84496985330027, 
                    },
                    marker:'assets/thmarker.png',
                    content:'Tong Heng is the oldest confectioneries. \n Witness a story of resilience, \n determination and resourcefulness.' ,
                    src:'landmarks/chinatown/tongheng.html',
                    contentHTML :
                    '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h4>Tong Heng</h4>' +
                    '<div class="text-center" id="bodyContent">' +
                    '<h5>*Distance Away*</h5>'+
                    "<a href='main.html?TH'><button class='btn btn-primary'>NAVIGATE</button></a>"+
                    "</div>" +
                    "</div>"
                }, 
                { 
                    name: "Buddha Tooth Relic",
                    legend:'BTR',
                    location: { 
                        lat: 1.2815604059789072, // add here latitude if using static data 
                        lng: 103.84423719747802, // add here longitude if using static data 
            
                    },
                    marker:'assets/btrmarker.png',
                    content:"Experience buddhist temple and museum complex located in the Chinatown district of Singapore. \n The temple's monastics and devotees officially practice Chinese Buddhism.",
                    src:'landmarks/chinatown/buddhatoothrelic.html',
                    contentHTML :
                    '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h4>Buddha Tooth Relic</h4>' +
                    '<div class="text-center" id="bodyContent">' +
                    '<h5>*Distance Away*</h5>'+
                    "<a href='main.html?BTR'><button class='btn btn-primary'>NAVIGATE</button></a>"+
                    "</div>" +
                    "</div>"
                }, 
                
                { 
                    name: "Pagoda Street & Trengannu Street", 
                    legend:'PGTST',
                    location:{ 
                         
                        lat:1.2831788568902647,  
                        lng:103.84473979738155, 
                    },
                    marker:'assets/psmarker.png',
                    content:'Located in Chinatown within the Outram Planning Area in Singapore \n Terengannu Street linking Pagoda Street and Sago Street, \n and is intersected by Temple Street and Smith Street.',
                    src:'landmarks/chinatown/pagodastreet.html',
                    contentHTML :
                    '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h4>Pagoda Street & Trengannu Street</h4>' +
                    '<div class="text-center" id="bodyContent">' +
                    '<h5>*Distance Away*</h5>'+
                    "<a href='main.html?PGTST'><button class='btn btn-primary'>NAVIGATE</button></a>"+
                    "</div>" +
                    "</div>"
                },
                { 
                    name: "Sago Street",
                    legend:'SGST', 
                    location:{ 
                       
                        lat:1.281800536866017,  
                        lng: 103.84399338201563, 
                    },
                    marker:'assets/ssmarker.png',
                    content:'Singapore largest historic district, serving mainly as a tourist attraction that houses food outlets, bars, retail shops and offices \n with the streets lined up with pushcarts selling a range of souvenirs and street snacks.',
                    src:'landmarks/chinatown/sagostreet.html',
                    contentHTML :
                    '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h4>Sago Street</h4>' +
                    '<div class="text-center" id="bodyContent">' +
                    '<h5>*Distance Away*</h5>'+
                    "<a href='main.html?SGST'><button class='btn btn-primary'>NAVIGATE</button></a>"+
                    "</div>" +
                    "</div>"
                }, 
            
                { 
                    name: "Mural at Mohammed Ali Lane",
                    legend:'MMAL',
                    location:{ 
                        lat:1.2827594818546095,  
                        lng:103.84583411762635, 
                    }, 
                    marker:'assets/muralmarker.png',
                    content:'Along Mohammed Ali Lane, you’ll spot a snapshot of history—a quirky scene of Singapore’s street vendors \n from our early years of independence in the 1960s. \n Witness murals that depict the past through the eyes of singaporean artist Yip Yew Chong.',
                    src:'landmarks/chinatown/muralletterwriter.html',
                    contentHTML :
                    '<div id="content" >' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h4 class="text-center">Mural at Mohamed Ali Lane</h4>' +
                    '<div class="text-center" id="bodyContent">' +
                    '<h5>*Distance Away*</h5>'+
                    "<a href='main.html?MMAL'><button class='btn btn-primary'>NAVIGATE</button></a>"+
                    "</div>" +
                    "</div>"
                }, 
            
               
            
               
            
               

                
            ],
    },
    nyp:{

        name:"NYP",
        location:{lat:1.381460451553526, lng:103.8455654912015},
        content:"",
        landmarks:[
            {
                name: "Block L",
                legend:'BlockL', 
                location: { 
                    lat: 1.379224, // add here latitude if using static data 
                    lng: 103.849622, // add here longitude if using static data 
        
                },
                content:"Get transported back in time and experience the footsteps \n of migrants in the late 19th century of singapore",
                src:'landmarks/chinatown/buddhatoothrelic.html',
                extraContent:"Fascinating wall murals have been mushrooming all over the city in recent years, thanks to Singaporean artists like Yip Yew Chong. His work isn’t just Instagram-worthy, it’s turning roads, like this one in Chinatown, into street museums.Yew Chong painted these murals from his personal memories of Singapore’s past – he grew up in Sago Lane, a street across the road. The Paper Mask & Puppet Seller (on the right) was inspired by a real person who sold masks on this very street.",
                contentHTML :
                '<div id="content" >' +
                '<div id="siteNotice">' +
                "</div>" +
                '<h4 class="text-center">Block L</h4>' +
                '<div class="text-center" id="bodyContent">' +
                '<h5>*Distance Away*</h5>'+
                "<a href='main.html?BlockL'><button class='btn btn-primary'>NAVIGATE</button></a>"+
                "</div>" +
                "</div>"
            },
            {
                name: "Block A", 
                legend:'BlockA',
                location: { 
                    lat: 1.380098, // add here latitude if using static data 
                    lng: 103.848517, // add here longitude if using static data 
        
                },
                content:"Get transported back in time and experience the footsteps \n of migrants in the late 19th century of singapore",
                src:'landmarks/chinatown/muralletterwriter.html',
                extraContent:"Fascinating wall murals have been mushrooming all over the city in recent years, thanks to Singaporean artists like Yip Yew Chong. His work isn’t just Instagram-worthy, it’s turning roads, like this one in Chinatown, into street museums.Yew Chong painted these murals from his personal memories of Singapore’s past – he grew up in Sago Lane, a street across the road. The Paper Mask & Puppet Seller (on the right) was inspired by a real person who sold masks on this very street.",
                contentHTML :
                '<div id="content" >' +
                '<div id="siteNotice">' +
                "</div>" +
                '<h4 class="text-center">Block A</h4>' +
                '<div class="text-center" id="bodyContent">' +
                '<h5>*Distance Away*</h5>'+
                "<a href='main.html?BlockA'><button class='btn btn-primary'>NAVIGATE</button></a>"+
                "</div>" +
                "</div>"
        
            }, 
            // {
            //     name: "Secondary School", 
            //     location: { 
            //         lat: 1.382061, // add here latitude if using static data 
            //         lng: 103.843322, // add here longitude if using static data 
        
            //     },
            //     content:"Get transported back in time and experience the footsteps \n of migrants in the late 19th century of singapore",
            //     src:'landmarks/chinatown/masjidjamae.html',
            //     extraContent:"Fascinating wall murals have been mushrooming all over the city in recent years, thanks to Singaporean artists like Yip Yew Chong. His work isn’t just Instagram-worthy, it’s turning roads, like this one in Chinatown, into street museums.Yew Chong painted these murals from his personal memories of Singapore’s past – he grew up in Sago Lane, a street across the road. The Paper Mask & Puppet Seller (on the right) was inspired by a real person who sold masks on this very street.",

            //     contentHTML :
            //     '<div id="content" >' +
            //     '<div id="siteNotice">' +
            //     "</div>" +
            //     '<h4 class="text-center">Secondary School</h4>' +
            //     '<div class="text-center" id="bodyContent">' +
            //     '<h5>*Distance Away*</h5>'+
            //     "<a href='main.html?SecSchool'><button class='btn btn-primary'>NAVIGATE</button></a>"+
            //     "</div>" +
            //     "</div>"
            // },
            // {
            //     name: "Yio Chu Kang", 
            //     location: { 
            //         lat: 1.381643, // add here latitude if using static data 
            //         lng: 103.845035, // add here longitude if using static data 
        
            //     },
            //     content:"Get transported back in time and experience the footsteps \n of migrants in the late 19th century of singapore",
            //     src:'landmarks/chinatown/sagostreet.html',
            //     extraContent:"Fascinating wall murals have been mushrooming all over the city in recent years, thanks to Singaporean artists like Yip Yew Chong. His work isn’t just Instagram-worthy, it’s turning roads, like this one in Chinatown, into street museums.Yew Chong painted these murals from his personal memories of Singapore’s past – he grew up in Sago Lane, a street across the road. The Paper Mask & Puppet Seller (on the right) was inspired by a real person who sold masks on this very street.",

            //     contentHTML :
            //     '<div id="content" >' +
            //     '<div id="siteNotice">' +
            //     "</div>" +
            //     '<h4 class="text-center">Yio Chu Kang MRT</h4>' +
            //     '<div class="text-center" id="bodyContent">' +
            //     '<h5>*Distance Away*</h5>'+
            //     "<a href='main.html?YCKMRT'><button class='btn btn-primary'>NAVIGATE</button></a>"+
            //     "</div>" +
            //     "</div>"
        
            // }
        ]
    }
}

