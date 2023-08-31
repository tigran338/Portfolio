function excelDateToMMYYYY(serialDate) {
    const daysInJan1900 = new Date(1900, 0, 1).valueOf();
    const dateObj = new Date(daysInJan1900 + (serialDate - 2) * 24 * 60 * 60 * 1000);
    return `${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
}

fetch('./Resume.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
        const workbook = XLSX.read(data, {type: 'array'}); // Parse the .xlsx file
        const worksheet = workbook.Sheets['Experience'];
        const json = XLSX.utils.sheet_to_json(worksheet); // Convert the worksheet to a JSON array

        // Now generate the HTML for each workplace and append to the 'workplaces' div
        const workplacesDiv = document.getElementById('workplaces');
        json.forEach(workplace => {
            const fromDate = excelDateToMMYYYY(workplace['Date From']);
            const toDate = excelDateToMMYYYY(workplace['Date To']);
            
            // Splitting description and creating bullet points
            const descriptionList = workplace.Description.split("\n")
                                   .map(item => `<li>${item.trim()}</li>`)
                                   .join('');
            
            const workplaceDiv = document.createElement('div');
            workplaceDiv.innerHTML = `
                <h3>${workplace.Position} (${fromDate} - ${toDate})</h3>
                <p>${workplace.Employer} ${workplace.Location}</p>
                <ul>${descriptionList}</ul>
            `;
            workplacesDiv.appendChild(workplaceDiv);
        });
    });
