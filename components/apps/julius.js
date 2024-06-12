import React, { Component } from 'react';
import ReactGA from 'react-ga4';

export class AboutJulius extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about", // by default 'about' screen is active
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About />,
            "education": <Education />,
            "skills": <Skills />,
            "projects": <Projects />,
            "resume": <Resume />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }

        // focus last visited screen
        this.changeScreen(document.getElementById(lastVisitedScreen));
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;

        // store this state
        localStorage.setItem("about-section", screen);

        // google analytics
        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "Custom Title" });


        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        return (
            <>
                <div id="about" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className="w-3 md:w-4" alt="about vivek" src="./themes/Yaru/status/about.svg" />
                    <span className="ml-1 md:ml-2 text-gray-50">About Me</span>
                </div>
                <div id="education" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "education" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className="w-3 md:w-4" alt="vivek' education" src="./themes/Yaru/status/education.svg" />
                    <span className="ml-1 md:ml-2 text-gray-50">Education</span>
                </div>
                <div id="skills" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className="w-3 md:w-4" alt="vivek' skills" src="./themes/Yaru/status/skills.svg" />
                    <span className="ml-1 md:ml-2 text-gray-50">Skills</span>
                </div>
                <div id="projects" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "projects" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className="w-3 md:w-4" alt="vivek' projects" src="./themes/Yaru/status/projects.svg" />
                    <span className="ml-1 md:ml-2 text-gray-50">Projects</span>
                </div>
                <div id="resume" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "resume" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className="w-3 md:w-4" alt="vivek's resume" src="./themes/Yaru/status/download.svg" />
                    <span className="ml-1 md:ml-2 text-gray-50">Resume</span>
                </div>
                <div className='my-0.5 w-28 md:w-full h-8 px-2 md:px-2.5 flex' >
                    <iframe src="https://github.com/sponsors/vivek9patel/button" title="Sponsor vivek9patel" width={"100%"} height={"100%"} ></iframe>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="relative flex w-full h-full text-white select-none bg-ub-cool-grey">
                <div className="flex-col hidden w-1/4 overflow-y-auto text-sm border-r border-black md:flex md:w-1/5 windowMainScreen">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="absolute flex flex-col items-center justify-center w-6 h-6 rounded md:hidden bg-ub-cool-grey top-1 left-1">
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className={(this.state.navbar ? " visible animateShow z-30 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-start flex-grow w-3/4 overflow-y-auto md:w-4/5 bg-ub-grey windowMainScreen">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutJulius;

export const displayAboutJulius = () => {
    return <AboutJulius />;
}


function About() {
    return (
        <>
            <div className="w-20 my-4 bg-white rounded-full md:w-28">
                <img className="w-full" src="./images/logos/bitmoji.png" alt="Julius Mwangi Logo" />
            </div>
            <div className="px-1 mt-4 text-lg text-center md:mt-8 md:text-2xl">
                <div>my name is <span className="font-bold">Julius Mwangi</span> ,</div>
                <div className="ml-1 font-normal">I'm a <span className="font-bold text-pink-600">Frontend Developer!</span></div>
            </div>
            <div className="relative w-32 pt-px mt-4 bg-white md:my-8 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className="w-5/6 mt-4 text-sm leading-tight tracking-tight md:text-base md:w-3/4 emoji-list">
                <li className=" list-pc">I'm a <span className="font-medium ">Graduate Student</span> currently pursuing Computer Science. I've completed my 6 month intern at <u className='cursor-pointer '> <a href="https://en.wikipedia.org/wiki/HackerRank" target={"_blank"}>JHUB AFRICA</a> </u>, and now I'm looking for full-time frontend developer roles! ( Hit me up <a className='text-underline' href='mailto:vivek.p9737@gmail.com'><u>@vivek.p9737@gmail.com</u></a> :) )</li>
                <li className="mt-3 list-building"> I enjoy building awesome softwares that solve practical problems.</li>
                <li className="mt-3 list-time"> When I am not coding my next project, I like to spend my time reading books, playing monopoly or watching <a href="https://www.youtube.com/channel/UCBa659QWEk1AI4Tg--mrJ2A" target="_blank" rel="noreferrer"> Kevin Powell videos.</a></li>
                <li className="mt-3 list-star"> And I also have interest in Deep Learning & Computer Vision!</li>
            </ul>
        </>
    )
}
function Education() {
    return (
        <>
            <div className="relative mt-2 mb-4 text-2xl font-medium md:mt-4">
                Education
                <div className="absolute w-full pt-px mt-px bg-white top-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className="w-10/12 px-0 mt-4 ml-4 md:px-1">
                <li className="list-disc">
                    <div className="text-lg font-bold leading-tight text-left md:text-xl">
                        Jomo Kenyatta University Of Agriculture and Technology
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2022 - 2026</div>
                    <div className="text-sm md:text-base">Computer Technology</div>
                    <div className="mt-1 text-sm font-bold text-gray-300">GPA &nbsp; 4.0/4.0</div>
                </li>
                <li className="list-disc">
                    <div className="text-lg font-bold leading-tight text-left md:text-xl">
                       Moringa Technology School
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2021 - 2022</div>
                    <div className="text-sm md:text-base">Computer Engineering</div>
                    <div className="mt-1 text-sm font-bold text-gray-300">CGPA &nbsp; 9.35/10</div>
                </li>
                <li className="mt-5 list-disc">
                    <div className="text-lg font-bold leading-tight text-left md:text-xl">
                        Grade 2<sup>th</sup> (GSEB)
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2016 - 2018</div>
                    <div className="text-sm md:text-base">Maths, Physics, Chemistry</div>
                    <div className="mt-1 text-sm font-bold text-gray-300">Percentile Rank &nbsp; 94.1%</div>
                </li>
            </ul>
        </>
    )
}
function Skills() {
    return (
        <>
            <div className="relative mt-2 mb-4 text-2xl font-medium md:mt-4">
                Technical Skills
                <div className="absolute w-full pt-px mt-px bg-white top-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className="w-10/12 text-sm tracking-tight md:text-base emoji-list">
                <li className="mt-4 text-sm leading-tight tracking-tight list-arrow md:text-base">
                    I've worked with a wide variety of programming languages & frameworks.
                </li>
                <li className="mt-4 text-sm leading-tight tracking-tight list-arrow md:text-base">
                    <div> My areas of expertise are <strong className="text-ubt-gedit-orange">front-end development and Java</strong></div>
                </li>
                <li className="mt-4 text-sm leading-tight tracking-tight list-arrow md:text-base">
                    <div>Here are my most frequently used</div>
                </li>
            </ul>
            <div className="flex w-full mt-4 md:w-10/12">
                <div className="w-1/2 text-sm font-bold text-center md:text-base">Languages & Tools</div>
                <div className="w-1/2 text-sm font-bold text-center md:text-base">Frameworks & Libraries</div>
            </div>
            <div className="flex items-start justify-center w-full font-bold text-center md:w-10/12">
                <div className="w-1/2 px-2">
                    <div className="flex flex-wrap items-start justify-center w-full mt-2">
                        <img className="m-1" src="https://img.shields.io/badge/-JavaScript-%23F7DF1C?style=flat&logo=javascript&logoColor=000000&labelColor=%23F7DF1C&color=%23FFCE5A" alt="vivek javascript" />
                        <img className="m-1" src="https://img.shields.io/badge/C%2B%2B-00599C?style=flat&logo=c%2B%2B&logoColor=white" alt="vivek c++" />
                        <img className="m-1" src="http://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=ffffff" alt="vivek python" />
                        <img className="m-1" src="https://img.shields.io/badge/Dart-0175C2?style=flat&logo=dart&logoColor=white" alt="vivek dart" />
                        <a href="https://www.google.com/search?q=is+html+a+language%3F" target="_blank" rel="noreferrer"><img title="yes it's a language!" className="m-1" src="https://img.shields.io/badge/-HTML5-%23E44D27?style=flat&logo=html5&logoColor=ffffff" alt="vivek HTML" /></a>
                        <img src="https://img.shields.io/badge/-Sass-%23CC6699?style=flat&logo=sass&logoColor=ffffff" alt="vivek SASS" className="m-1" />
                        <img src="https://img.shields.io/badge/-Git-%23F05032?style=flat&logo=git&logoColor=%23ffffff" alt="vivek git" className="m-1" />
                        <img src="https://img.shields.io/badge/-Firebase-FFCA28?style=flat&logo=firebase&logoColor=ffffff" alt="vivek firebase" className="m-1" />
                    </div>
                </div>
                <div className="flex flex-wrap items-start w-1/2 px-2">
                    <div className="flex flex-wrap items-start justify-center w-full mt-2">
                        <img className="m-1 " src="https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=ffffff" alt="vivek next" />
                        <img className="m-1 " src="https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=ffffff" alt="vivek react" />
                        <img className="m-1" src="https://img.shields.io/badge/Flutter-02569B?style=flat&logo=flutter&logoColor=white" alt="vivek flutter" />
                        <img className="m-1" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="vivek tailwind css" />
                        <img src="https://img.shields.io/badge/-Nodejs-339933?style=flat&logo=Node.js&logoColor=ffffff" alt="vivek node.js" className="m-1" />
                        <img src="https://img.shields.io/badge/jQuery-0769AD?style=flat&logo=jquery&logoColor=white" alt="vivek jquery" className="m-1" />
                        <img className="m-1" src="https://img.shields.io/badge/Redux-593D88?style=flat&logo=redux&logoColor=white" alt="vivek redux" />
                    </div>
                </div>
            </div>
            <ul className="w-10/12 mt-4 text-sm tracking-tight md:text-base emoji-list">
                <li className="mt-4 text-sm leading-tight tracking-tight list-arrow md:text-base">
                    <span> And of course,</span> <img className="inline ml-1 " src="http://img.shields.io/badge/-Linux-0078D6?style=plastic&logo=linux&logoColor=ffffff" alt="vivek linux" /> <span>!</span>
                </li>
            </ul>
        </>
    )
}

function Projects() {
    const project_list = [
        {
            name: "UbuntuOS Portfolio",
            date: "Apr 2022",
            link: "https://github.com/vivek9patel/vivek9patel.github.io",
            description: [
                "Personal portfolio website of theme Ubuntu 20.04, made using NEXT.js & tailwind CSS",
            ],
            domains: ["javascript", "next.js", "tailwindcss"]
        },
        {
            name: "Chrome Extension React Boilerplate",
            date: "Dec 2021",
            link: "https://github.com/vivek9patel/chrome-extension-react-boilerplate",
            description: [
                "A boilerplate code to build a chrome extension with react and webpack",
            ],
            domains: ["javascript", "chrome-extension"]
        },
        {
            name: "CodeConnect",
            date: "Nov 2021",
            link: "https://github.com/vivek9patel/CodeConnect-frontend",
            description: [
                "A multi-language pair-programming platform with the features of video meeting and whiteboard. Built with React.js, Tailwind CSS, Chakra UI, Express & Socket.io.",
            ],
            domains: ["javascript", "tailwindcss"]
        },
        {
            name: "Ad Free Spotify",
            date: "Jun 2021",
            link: "https://github.com/vivek9patel/ad-free-spotify",
            description: [
                "Chrome extension to automatically mute/unmute Spotify tab when Advertisement starts and ends!",
            ],
            domains: ["javascript", "chrome-extension"]
        },
        {
            name: "economist.com Unlocked",
            date: "Mar 2021",
            link: "https://github.com/vivek9patel/economist.com-unlocked",
            description: [
                "A chrome extension to read Paid Articles for Free & with no Ads, no subscription, no memberships!",
            ],
            domains: ["javascript", "chrome-extension"]
        },
        {
            name: "Flutter banking app",
            date: "Jan 2021",
            link: "https://github.com/vivek9patel/flutter-banking-app",
            description: [
                "A Flutter & Firebase project for creating transactions between different Users and displaying the history of transactions done by all.",
            ],
            domains: ["flutter", "firestore", "dart", "firebase auth"]
        },
        {
            name: "CPU scheduling application",
            date: "Dec 2020",
            link: "https://github.com/vivek9patel/CPU-Scheduling-APP-React-Native",
            description: [
                "React Native Application to visualize the CPU Scheduling algorithms with different Processes and Animations with gannt chart.",
            ],
            domains: ["react-native", "javascript"]
        },
        {
            name: "Meditech Healthcare WebApp",
            date: "Nov 2022",
            link: "https://github.com/mwangimuringi/KahawaYetu-Coffee cooperative app",
            description: [
                "Developed Web Application to predict and diagnose diseases from x-ray images.",
            ],
            domains: ["javascript", "html5", "sass", "firebase", "tensorflow"]
        },
        {
            name: "Problem Recommendation System",
            date: "Sep 2023",
            link: "https://github.com/mwangimuringi/Improve-Codeforces",
            description: [
                "Spring boot web application to suggest practice problems from the areas in which the user struggles to get pass in code-forces.",
            ],
            domains: ["spring", "Java", "codeforces-api", "javascript"]
        },
        {
            name: "Cleanliness Automation",
            date: "Dec 2022",
            link: "https://github.com/mwangimuringi/CPU-Scheduling-APP-React-Native",
            description: [
                "Developed Web Applications to automate Garbage collection and extraction systems for SSIP hackathon",
            ],
        }
    ];

    const tag_colors = {
        "javascript": "yellow-300",
        "firebase": "red-600",
        "firestore": "red-500",
        "firebase auth": "red-400",
        "chrome-extension": "yellow-400",
        "flutter": "blue-400",
        "dart": "blue-500",
        "react-native": "purple-500",
        "html5": "pink-600",
        "sass": "pink-400",
        "tensorflow": "yellow-600",
        "django": "green-600",
        "python": "green-200",
        "codeforces-api": "gray-300",
        "tailwindcss": "blue-300",
        "next.js": "purple-600"
    }

    return (
        <>
            <div className="relative mt-2 mb-4 text-2xl font-medium md:mt-4">
                Projects
                <div className="absolute w-full pt-px mt-px bg-white top-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <iframe src="https://github.com/sponsors/mwangimuringi/card" title="Sponsor vivek9patel" className='w-5/6 my-4 md:w-3/4' ></iframe>

            {
                project_list.map((project, index) => {
                    const projectNameFromLink = project.link.split('/')
                    const projectName = projectNameFromLink[projectNameFromLink.length - 1]
                    return (
                        <a key={index} href={project.link} target="_blank" rel="noreferrer" className="flex flex-col w-full px-4">
                            <div className="w-full px-2 py-1 my-2 border rounded cursor-pointer border-gray-50 border-opacity-10 hover:bg-gray-50 hover:bg-opacity-5">
                                <div className="flex flex-wrap items-center justify-between">
                                    <div className='flex items-center justify-center'>
                                        <div className="mr-2 text-base md:text-lg">{project.name.toLowerCase()}</div>
                                        <iframe src={`https://ghbtns.com/github-btn.html?user=mwangimuringi=${projectName}&type=star&count=true`} frameBorder="0" scrolling="0" width="150" height="20" title={project.name.toLowerCase()+"-star"}></iframe>
                                    </div>
                                    <div className="text-sm font-light text-gray-300">{project.date}</div>
                                </div>
                                <ul className="mt-1 ml-4 text-sm font-light leading-tight tracking-normal ">
                                    {
                                        project.description.map((desc, index) => {
                                            return <li key={index} className="mt-1 text-gray-100 list-disc">{desc}</li>;
                                        })
                                    }
                                </ul>
                                <div className="flex flex-wrap items-start justify-start py-2 text-xs">
                                    {
                                        (project.domains ?
                                            project.domains.map((domain, index) => {
                                                const borderColorClass = `border-${tag_colors[domain]}`
                                                const textColorClass = `text-${tag_colors[domain]}`

                                                return <span key={index} className={`px-1.5 py-0.5 w-max border ${borderColorClass} ${textColorClass} m-1 rounded-full`}>{domain}</span>
                                            })

                                            : null)
                                    }
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </>
    )
}
function Resume() {
    return (
        <iframe className="w-full h-full" src="./files/Vivek-Patel-Resume.pdf" title="vivek patel resume" frameBorder="0"></iframe>
    )
}