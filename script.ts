declare const html2pdf: any;

const form = document.getElementById("resumeForm") as HTMLFormElement;
const resumePage = document.getElementById("resumePage") as HTMLElement;
const resumePhoto = document.getElementById("resumePhoto") as HTMLImageElement;
const resumeName = document.getElementById("resumeName") as HTMLHeadingElement;
const resumeEmail = document.getElementById("resumeEmail") as HTMLParagraphElement;
const resumePhone = document.getElementById("resumePhone") as HTMLParagraphElement;
const resumeEducation = document.getElementById("resumeEducation") as HTMLParagraphElement;
const resumeExperience = document.getElementById("resumeExperience") as HTMLParagraphElement;
const resumeSkills = document.getElementById("resumeSkills") as HTMLParagraphElement;
const downloadPdf = document.getElementById("downloadPdf") as HTMLButtonElement;
const backBtn = document.getElementById("backBtn") as HTMLButtonElement;
const editBtn = document.getElementById("editBtn") as HTMLButtonElement;
const resumeContent = document.getElementById("resumeContent") as HTMLDivElement;
const sharelinkBtn = document.getElementById("sharelinkBtn") as HTMLButtonElement;

form.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    const name1 = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("Phone") as HTMLInputElement).value;
    const degree = (document.getElementById("degree") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLInputElement).value;
    const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
    const photoInput = document.getElementById("photo") as HTMLInputElement;

    const photoFile = photoInput.files ? photoInput.files[0] : null;
    let photoBase64 = "";

    if (photoFile) {
        photoBase64 = await fileToBase64(photoFile);
        localStorage.setItem("resumePhoto", photoBase64);
        resumePhoto.src = photoBase64;
    }

    document.querySelector(".container")?.classList.add("hidden");
    resumePage.classList.remove("hidden");

    resumeName.textContent = name1;
    resumeEmail.textContent = `Email: ${email}`;
    resumePhone.textContent = `Phone: ${phone}`;
    resumeEducation.textContent = `${degree} from ${education}`;
    resumeExperience.textContent = experience;
    resumeSkills.textContent = skills;

    const queryParams = new URLSearchParams({
        name: name1,
        email: email,
        phone: phone,
        degree: degree,
        education: education,
        experience: experience,
        skills: skills,
    });

    const uniqueURL = `${window.location.origin}?${queryParams.toString()}`;
    sharelinkBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(uniqueURL);
        alert("The link is copied");
    });

    window.history.replaceState(null, "", `?${queryParams.toString()}`);
});

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

editBtn.addEventListener("click", () => {
    updateFormFromResume();
    document.querySelector(".container")?.classList.remove("hidden");
    resumePage.classList.add("hidden");
});

function updateFormFromResume() {
    const [degree, education] = resumeEducation.textContent?.split(" from ") || ["", ""];
    (document.getElementById("name") as HTMLInputElement).value = resumeName.textContent || "";
    (document.getElementById("email") as HTMLInputElement).value = resumeEmail.textContent?.replace("Email: ", "") || "";
    (document.getElementById("Phone") as HTMLInputElement).value = resumePhone.textContent?.replace("Phone: ", "") || "";
    (document.getElementById("degree") as HTMLInputElement).value = degree;
    (document.getElementById("education") as HTMLInputElement).value = education;
    (document.getElementById("experience") as HTMLTextAreaElement).value = resumeExperience.textContent || "";
    (document.getElementById("skills") as HTMLTextAreaElement).value = resumeSkills.textContent || "";
}


downloadPdf.addEventListener("click",()=>{
    if(typeof html2pdf =='undefined'){
        alert('Error : html2pdf library is not loaded')
        return;
    }

const resumeOptions ={
    margin:0.5,
    filename: 'resume.pdf',
    image:{type:'jpeg', quality:1.0},
    html2canvas:{scale:2},
    jsPDF:{unit:'in',format:"letter",orientation:'portrait'}

}
html2pdf()
.from(resumeContent)
.set(resumeOptions)
.save()
.catch((error:Error)=>{
    console.error("Pdf error",error)
})
});
window.addEventListener("DOMContentLoaded",()=>{
    const params = new URLSearchParams(window.location.search);
    const name  = params.get ("name") || '';
    const email  = params.get ("email") || '';
    const phone  = params.get ("phone") || '';
    const degree  = params.get ("degree") || '';
    const education  = params.get ("education") || '';
    const experience  = params.get ("experience") || '';
    const skills  = params.get ("skills") || '';
 
    if (name || email || phone || degree || education || experience || skills){
        resumeName.textContent = name;
        resumeEmail.textContent = `Email : ${email}`
        resumePhone.textContent = `Phone : ${phone}`;
        resumeEducation.textContent = `${degree} from ${education}`;
        resumeExperience.textContent =experience;
        resumeSkills.textContent=skills;

        const savePhoto =localStorage.getItem("resumePhoto")
        if(savePhoto){
            resumePhoto.src = savePhoto;
        }


    }
    
})

resumePhoto.style.width="150px";
resumePhoto.style.height="150px"
resumePhoto.style.objectFit="cover";
resumePhoto.style.borderRadius ="54%";
resumePhoto.style.display="block";
resumePhoto.style.margin = "0 auto";
