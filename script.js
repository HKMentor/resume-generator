"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById("resumeForm");
const resumePage = document.getElementById("resumePage");
const resumePhoto = document.getElementById("resumePhoto");
const resumeName = document.getElementById("resumeName");
const resumeEmail = document.getElementById("resumeEmail");
const resumePhone = document.getElementById("resumePhone");
const resumeEducation = document.getElementById("resumeEducation");
const resumeExperience = document.getElementById("resumeExperience");
const resumeSkills = document.getElementById("resumeSkills");
const downloadPdf = document.getElementById("downloadPdf");
const backBtn = document.getElementById("backBtn");
const editBtn = document.getElementById("editBtn");
const resumeContent = document.getElementById("resumeContent");
const sharelinkBtn = document.getElementById("sharelinkBtn");
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    event.preventDefault();
    const name1 = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("Phone").value;
    const degree = document.getElementById("degree").value;
    const education = document.getElementById("education").value;
    const experience = document.getElementById("experience").value;
    const skills = document.getElementById("skills").value;
    const photoInput = document.getElementById("photo");
    const photoFile = photoInput.files ? photoInput.files[0] : null;
    let photoBase64 = "";
    if (photoFile) {
        photoBase64 = yield fileToBase64(photoFile);
        localStorage.setItem("resumePhoto", photoBase64);
        resumePhoto.src = photoBase64;
    }
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
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
}));
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
editBtn.addEventListener("click", () => {
    var _a;
    updateFormFromResume();
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    resumePage.classList.add("hidden");
});
function updateFormFromResume() {
    var _a, _b, _c;
    const [degree, education] = ((_a = resumeEducation.textContent) === null || _a === void 0 ? void 0 : _a.split(" from ")) || ["", ""];
    document.getElementById("name").value = resumeName.textContent || "";
    document.getElementById("email").value = ((_b = resumeEmail.textContent) === null || _b === void 0 ? void 0 : _b.replace("Email: ", "")) || "";
    document.getElementById("Phone").value = ((_c = resumePhone.textContent) === null || _c === void 0 ? void 0 : _c.replace("Phone: ", "")) || "";
    document.getElementById("degree").value = degree;
    document.getElementById("education").value = education;
    document.getElementById("experience").value = resumeExperience.textContent || "";
    document.getElementById("skills").value = resumeSkills.textContent || "";
}
downloadPdf.addEventListener("click", () => {
    if (typeof html2pdf == 'undefined') {
        alert('Error : html2pdf library is not loaded');
        return;
    }
    const resumeOptions = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: "letter", orientation: 'portrait' }
    };
    html2pdf()
        .from(resumeContent)
        .set(resumeOptions)
        .save()
        .catch((error) => {
        console.error("Pdf error", error);
    });
});
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || '';
    const email = params.get("email") || '';
    const phone = params.get("phone") || '';
    const degree = params.get("degree") || '';
    const education = params.get("education") || '';
    const experience = params.get("experience") || '';
    const skills = params.get("skills") || '';
    if (name || email || phone || degree || education || experience || skills) {
        resumeName.textContent = name;
        resumeEmail.textContent = `Email : ${email}`;
        resumePhone.textContent = `Phone : ${phone}`;
        resumeEducation.textContent = `${degree} from ${education}`;
        resumeExperience.textContent = experience;
        resumeSkills.textContent = skills;
        const savePhoto = localStorage.getItem("resumePhoto");
        if (savePhoto) {
            resumePhoto.src = savePhoto;
        }
    }
});
resumePhoto.style.width = "150px";
resumePhoto.style.height = "150px";
resumePhoto.style.objectFit = "cover";
resumePhoto.style.borderRadius = "54%";
resumePhoto.style.display = "block";
resumePhoto.style.margin = "0 auto";
