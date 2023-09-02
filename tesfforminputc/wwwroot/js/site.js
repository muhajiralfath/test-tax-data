// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let countryCode = ""
let taxData = 0
const fetchData = async (url) => {
    const response = await fetch(url);
    return await response.json();
};

const updateInputValue = (elementId, value) => {
    document.getElementById(elementId).value = value;
};

const getCountry = async (event) => {
    if (event.length === 3) {
        const jsonResponse = await fetchData(`https://insw-dev.ilcs.co.id/n/negara?ur_negara=${event}`);
        if (jsonResponse.code === "200") {
            const countries = jsonResponse.data[0].ur_negara;
            countryCode = jsonResponse.data[0].kd_negara;
            updateInputValue('country', countries);
        }
    }
};

const getHarbor = async (event) => {
    if (e.length === 3) {
        const jsonResponse = await fetchData(`https://insw-dev.ilcs.co.id/n/pelabuhan?kd_negara=${countryCode}&ur_pelabuhan=${event}`);
        if (jsonResponse.code === "200") {
            const harbor = jsonResponse.data[0].ur_pelabuhan;
            updateInputValue('harbor', harbor);
        }
    }
};

const getDataDetail = async (event) => {
    const jsonResponse = await fetchData(`https://insw-dev.ilcs.co.id/n/barang?hs_code=${event}`);
    if (jsonResponse.code === "200") {
        const detailData = `${jsonResponse.data[0].sub_header} ${jsonResponse.data[0].uraian_id}`;
        updateInputValue('detail', detailData);
    } else {
        updateInputValue('detail', '');
    }
    await getTax(e);
};

const getTax = async (event) => {
    const jsonResponse = await fetchData(`https://insw-dev.ilcs.co.id/n/tarif?hs_code=${event}`);
    if (jsonResponse.code === "200") {
        taxData = jsonResponse.data[0].bm;
        updateInputValue('tax', taxData);
    } else {
        updateInputValue('tax', '');
    }
};

const getTotal = (event) => {
    let total = event * taxData;
    if (total) {
        updateInputValue('total', total);
    } else {
        updateInputValue('total', '');
    }
};