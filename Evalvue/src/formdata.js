const _createEmployee = () => {
    // Ensure all necessary variables are defined and valid
    if (!user_id || !companyname || !image || !documentvalue || !dtNumber || !gstnumber || 
        !sectordata || !listdata || !countrydata || !statedata || !citydata || !areadata || 
        !Pincode || !employeeRange || !selectedPDF) {
        console.error('Missing required fields');
        return;
    }

    // Create FormData object
    var formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('organization_name', companyname);
    formData.append('organization_image', {
        uri: image.uri,
        name: image.name || 'image.png',  // Ensure 'name' property exists
        type: image.type,
    });
    formData.append('document_type_id', documentvalue);
    formData.append('document_number', dtNumber);
    formData.append('gstin', gstnumber);
    formData.append('sector_id', sectordata);
    formData.append('listed_id', listdata);
    formData.append('country_id', countrydata);
    formData.append('state_id', statedata);
    formData.append('city_id', citydata);
    formData.append('area', areadata);
    formData.append('pincode', Pincode);
    formData.append('number_of_employee', employeeRange);
    formData.append('document_file', {
        uri: selectedPDF.uri,
        name: selectedPDF.name || 'document.pdf',  // Ensure 'name' property exists
        type: selectedPDF.type,
    });

    // For debugging purposes, log each form data entry
    for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    // Send POST request
    axios.post('https://api.evalvue.com/create/organization/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(response => {
            console.log('Response from creating organization:', response.data);

            if (response.data.is_organization_register_successfull === true) {
                console.log('Organization creation successful');
                navigation.navigate('Dashboard');
            } else {
                console.error('Organization creation failed');
            }
        })
        .catch(error => {
            console.error('Error creating organization:', error);
        });
};
