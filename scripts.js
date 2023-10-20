function excelDateToMMMYYYY(serialDate) {
    const daysInJan1900 = new Date(1900, 0, 1).valueOf();
    const dateObj = new Date(daysInJan1900 + (serialDate - 2) * 24 * 60 * 60 * 1000);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
}

fetch('./Resume.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
        const workbook = XLSX.read(data, {type: 'array'});
        
        // Experience
        const experienceWorksheet = workbook.Sheets['Experience'];
        const experienceJson = XLSX.utils.sheet_to_json(experienceWorksheet);
        const workplacesDiv = document.getElementById('workplaces');
        experienceJson.forEach(workplace => {
            const fromDate = excelDateToMMMYYYY(workplace['Date From']).trim();
            const toDate = excelDateToMMMYYYY(workplace['Date To']).trim();
            const descriptionList = workplace.Description.split("\n")
                                   .map(item => `<li>${item.trim()}</li>`)
                                   .join('');
            
            const logoFileName = `${workplace.Employer.trim()}.png`; // Assuming the file format is PNG
            const logoPath = `./Employer_Logos/${logoFileName}`;
            
            const workplaceDiv = document.createElement('div');
            workplaceDiv.innerHTML = `
                <div class="workplace-info">
                    <div class="content-left">
                        <h3>${workplace.Position.trim()} (${fromDate} - ${toDate})</h3>
                        <p>${workplace.Employer.trim()}, ${workplace.Location.trim()}</p>
                        <div class="workplace-detail">
                            <ul>${descriptionList}</ul>
                        </div>
                    </div>
                    <div class="content-right">
                        <img src="${logoPath}" alt="${workplace.Employer.trim()} Logo" class="company-logo">
                    </div>
                </div>
            `;
            workplacesDiv.appendChild(workplaceDiv);
        });

        // Education & Certification
        const educationWorksheet = workbook.Sheets['Education'];
        const educationJson = XLSX.utils.sheet_to_json(educationWorksheet);
        const certificateWorksheet = workbook.Sheets['Certificate']; 
        const certificateJson = XLSX.utils.sheet_to_json(certificateWorksheet);

        const educationDiv = document.getElementById('educationDetails');

        // Process education
        educationJson.forEach(education => {
            let dateDisplay;
            if (education['Date From']) {
                const fromDate = excelDateToMMMYYYY(education['Date From']).trim();
                const toDate = education['Date To'] ? excelDateToMMMYYYY(education['Date To']).trim() : 'Present';
                dateDisplay = `(${fromDate} - ${toDate})`;
            } else {
                dateDisplay = `(${excelDateToMMMYYYY(education['Date To']).trim()})`;
            }

            const gpaDisplay = education.GPA ? `<p>GPA: ${education.GPA}</p>` : '';

            const educationItemDiv = document.createElement('div');
            educationItemDiv.className = 'education-item-box'; // Add this line to add class for styling
            educationItemDiv.innerHTML = `
                <h3>${education.Major.trim()} <span>${dateDisplay}</span></h3>
                <p>${education['Educational Institution'].trim()}, ${education.Location.trim()}</p>
                ${gpaDisplay}
                <p>${education.Description.trim()}</p>
            `;
            educationDiv.appendChild(educationItemDiv);
        });

        // Process certificate information
        certificateJson.forEach(certificate => {
            const dateDisplay = `(${excelDateToMMMYYYY(certificate['Date To']).trim()})`; 
            const gpaDisplay = certificate.GPA ? `<p>GPA: ${certificate.GPA}</p>` : '';
            
            const certificateItemDiv = document.createElement('div');
            certificateItemDiv.className = 'education-item-box'; // Add this line to add class for styling
            certificateItemDiv.innerHTML = `
                <h3>${certificate.Name.trim()} <span>${dateDisplay}</span></h3>
                <p>${certificate['Educational Institution'].trim()}, ${certificate.Location.trim()}</p>
                ${gpaDisplay}
                <p>${certificate.Description.trim()}</p>
            `;
            educationDiv.appendChild(certificateItemDiv);
        });

        // Projects
        const projectWorksheet = workbook.Sheets['Project'];
        const projectJson = XLSX.utils.sheet_to_json(projectWorksheet);
        const projectsDiv = document.getElementById('projects');

        projectJson.forEach(project => {
            const projectName = project.Name.trim();
            const projectDescription = project.Description.trim().replace(/\n/g, '<br>');
            const githubLink = project['GitHub Link'].trim();

            const projectDiv = document.createElement('div');
            projectDiv.className = 'project-item-box'; // Add a class for styling
            projectDiv.innerHTML = `
                <h3>${projectName}</h3>
                <p>${projectDescription}</p>
                <a href="${githubLink}" target="_blank">GitHub Repository</a>
            `;

            projectsDiv.appendChild(projectDiv);
        });
        
        // Skills
        const skillsWorksheet = workbook.Sheets['Skills'];
        const skillsJson = XLSX.utils.sheet_to_json(skillsWorksheet);

        const skillsDiv = document.getElementById('skills');

        let skillRows = []; // To store each category and its associated list

        skillsJson.forEach(skill => {
            const skillCategoryName = skill['Skills Type'].trim();
            const skillsList = skill['List of Skills'].split("\n"); // Splitting by newline to create an array of skills
            const skillsFormatted = skillsList.filter(Boolean).map(skillItem => `<li>${skillItem.trim()}</li>`).join(''); // Formatting the skills into a list

            skillRows.push(`
                <div class="single-skill-category">
                    <h3>${skillCategoryName}</h3>
                    <ul>${skillsFormatted}</ul>
                </div>
            `);
        });

        // Based on the desired format, process the skills 2 per row
        for (let i = 0; i < skillRows.length; i += 2) {
            const skillRowDiv = document.createElement('div');
            skillRowDiv.className = 'skill-row'; // Define this class in your CSS for flex or grid layout

            // If there's a next skill, append it too
            const nextSkillRow = skillRows[i + 1] ? skillRows[i + 1] : '';
            skillRowDiv.innerHTML = skillRows[i] + nextSkillRow;

            skillsDiv.appendChild(skillRowDiv);
        }
    });
