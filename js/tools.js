const cImage = 'Image';
const cId = 'ID';
const cType = 'Type';
const cRenteeWallet = 'Rentee Wallet';
const cLevel = "Level";
const cName = 'Rentee Name';
const cDSALevel = 'DSA Level';
const cProfitRatio = 'Profit Ratio';
const cRentalStartDate = "Rental Start";
const cRentalEndDate = "Rental End";
const cContractPeriod = "Rental Period";
const cRentDailyMiningTimes = 'Rental Mining / Day';
const cMiningTimes = 'Mining Times / Day';
const cRentCurrentProfit = 'Owner Rental Earned DSA';
const cRentMiningTimes = "Rental Mining Times";
const cRentEarnedDSA = 'Rental Earned DSA';
const cRentDailyDSA = 'Rental Daily DSA';
const cRentMinedRate = 'Rental Success Rate';
const cCost = "Cost $";
const cDsaUsed = "DSA Used";
const cTotalPeriod = "Total Life Calculation";
const cRentalPeriod = "Current Rental Calculation";

let filtersTitle = 'Filters Active : %d';
const showMessage = 'Show All';
let loadMessage = 'Loading Search Panes...';
const emptyPanes = 'No SearchPanes';
let emptyMessage = '<em>No data</em>';
const collapseMessage = 'Collapse All';
const clearMessage = 'Clear All';

getDragoImage = function (id) {
    return "https://lok-nft.leagueofkingdoms.com/api/card/drago/" + id;
};
WithPromiseAll = async function (promises) {
    return await Promise.all(promises.map((promise) => promise()));
};
delay = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

getHistory = async function (wallet) {
    const HERstory = await fetch("https://api-lok-beta.leagueofkingdoms.com/api/drago/rent/manage/history", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json;charset=UTF-8"
        },
        "referrer": "https://leagueofkingdoms.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{\"address\":\"${wallet}\"}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
    });
    let HISstory = await HERstory.json();
    let X = HISstory.history;
    return X;
};

dragoInfo = async function (id) {
    const dragoDetails = await fetch("https://lok-nft.leagueofkingdoms.com/api/market/detail", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json;charset=UTF-8"
        },
        "referrer": "https://leagueofkingdoms.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{\"tokenId\":\"${id}\"}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
    });
    let info = await dragoDetails.json();
//    console.log(info);
    return info;
};

loadDragoPopup = async function (dragoId) {
    const dragoDetails = await dragoInfo(dragoId);
    if (objectLength(dragoDetails) > 0) {
        let id = dragoDetails.drago.tokenId;
        let image = "https://lok-nft.leagueofkingdoms.com/api/card/drago/" + id;
        let genesis = dragoDetails.drago.filter.genesis ? "Yes" : "No";
        let type = dragoDetails.drago.grade === 0 ? "Normal" : "Legendary " + dragoDetails.drago.grade;
        let breed = dragoDetails.drago.breed;
        let fusion = dragoDetails.drago.fusion;
        let isOnRental = !isEmpty(dragoDetails.drago.rent.to) ? "Yes" : "No";
        let currentKeeperWallet = dragoDetails.drago.owner;
        let parents = dragoDetails.drago.parents.length === 2 ? dragoDetails.drago.parents[0] + ", " + dragoDetails.drago.parents[1] : "";

        let parts = dragoDetails.drago.filter.parts;//object {aqua: 0, dark: 0, fire: 0,​​ legendary: 2, light: 0, terra: 7}
        let views = dragoDetails.drago.filter.view;

        let currentDSA = dragoDetails.drago.rent.stats.currentDSA;
        let currentGathering = dragoDetails.drago.rent.stats.currentGathering;
        let currentProfit = dragoDetails.drago.rent.stats.currentProfit;
        let totalDSA = dragoDetails.drago.rent.stats.totalDSA;
        let totalGathering = dragoDetails.drago.rent.stats.totalGathering;
        let totalProfit = dragoDetails.drago.rent.stats.totalProfit;
        let totalRental = dragoDetails.drago.rent.stats.totalRental;
        let unclaimedProfit = dragoDetails.drago.rent.stats.unclaimedProfit;

        let onRentalWallet = isOnRental==="Yes" ? '<div class="dialogRow">Rentee Wallet: ' + hidePopupWallet(dragoDetails.drago.rent.to) + '</div>' : "";
        
        if (!isEmpty(dragoId)) {
            $('<div id="dialog"></div>').appendTo('body').append('<div class="imgPopupWrapper"><img src="' + image + '" class="imgPopup"></div><div class="dialogContainer">\n\
            <div class="leftDialog"><div class="dialogRow">Genesis: ' + genesis + '</div><div class="dialogRow">Type: ' + type + '</div>\n\
            <div class="dialogRow">Breed: ' + breed + '</div><div class="dialogRow">Fusion: ' + fusion + '</div>\n\
            <div class="dialogRow">Parts: (Aqua: ' + parts.aqua + ' Dark: ' + parts.dark + ' Fire: ' + parts.fire + ' Light: ' + parts.light + ' Terra: ' + parts.terra + ')</div>\n\
            <div class="dialogRow">Views: ' + views + '</div><div class="dialogRow">On Rental: ' + isOnRental + '</div>'+onRentalWallet+'</div>\n\
            <div class="rightDialog"><div class="dialogRow">Parents: ' + parents + '</div><div class="dialogRow">Total DSA: ' + totalDSA + '</div>\n\
            <div class="dialogRow">Total Gathering: ' + totalGathering + '</div><div class="dialogRow">Total Profit: ' + totalProfit + '</div>\n\
            <div class="dialogRow">Total Rental Times: ' + totalRental + '</div><div class="dialogRow">Rental DSA: ' + currentDSA + '</div>\n\
            <div class="dialogRow">Rental Gathering: ' + currentGathering + '</div><div class="dialogRow">Rental Profit: ' + currentProfit + '</div>\n\
            <div class="dialogRow">Unclaimed Profit: ' + unclaimedProfit + '</div>\n\
            </div></div>').dialog({
                modal: true,
                autoOpen: true,
                resizable: false,
                draggable: true,
                zIndex: 10000,
                width: "auto",
                height: "auto",
                dialogClass: 'dialogPopUp',
                show: {effect: "fade", duration: 500},
                hide: {effect: "drop", duration: 500},
                open: function () {
                    $('.ui-widget-overlay').bind('click', function () {
                        $('#dialog').dialog('close');
                    });
                },
                close: function (event, ui) {
                    $(this).remove();
                }
            });
        }
    }
//    console.log(dragoDetails);
};


async function getUnclaimedDSA(wallet) {
    const DSAinfo = await fetch("https://api-lok-beta.leagueofkingdoms.com/api/drago/rent/info", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json;charset=UTF-8"
        },
        "referrer": "https://leagueofkingdoms.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": '{"address":"' + wallet + '"}',
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
    });
    let DSAResult = await DSAinfo.json();
//    console.log(DSAResult.unclaimedProfit);
    return !isEmpty(DSAResult) ? DSAResult.unclaimedProfit : 0;

}
;
extractDragonIds = function (dragonsList) {
    let list = [];
    let length = dragonsList.length;
    for (var i = 0; i < length; i++) {
        list.push(dragonsList[i].myDragos.tokenId);
    }
//    console.log(list);
    return list.length > 0 ? list : null;
};

countRentalDragons = async function (wallet) {
    let rentalDragons = await getOnlyRentalDragons(wallet);
    return !isEmpty(rentalDragons) ? rentalDragons.length : 0;
};

getOnlyRentalDragons = async function (wallet) {
    let allDragons = await getAllDragons(wallet);
    let list = new Array();
    let length = allDragons.length;
    for (var i = 0; i < length; i++) {
        if (allDragons[i].rent.to !== null) {
            list.push(allDragons[i]);
        }
    }
//    console.log(list);
    return list.length > 0 ? list : null;
};

getAllDragons = async function (wallet) {
    const dragoInfo = await fetch("https://lok-nft.leagueofkingdoms.com/api/drago/inventory", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json;charset=UTF-8"
        },
        "referrer": "https://leagueofkingdoms.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": '{"address":"' + wallet + '","includeRent":true}',
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
    });
    let dragonsInfo = await dragoInfo.json();
    const allDragons = dragonsInfo.myDragos;
    return allDragons.length > 0 ? allDragons : null;
}
;

async function getNoRentalDragons(wallet) {
    const dragoInfo = await fetch("https://lok-nft.leagueofkingdoms.com/api/drago/inventory", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json;charset=UTF-8"
        },
        "referrer": "https://leagueofkingdoms.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": '{"address":"' + wallet + '","includeRent":false}',
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
    });
    let dragonsInfo = await dragoInfo.json();
    return !isEmpty(dragonsInfo) ? dragonsInfo : null;
}
;

getDate = function (isoDate) {
    let date = new Date(isoDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return year + '-' + month + '-' + day;
};

//=============================DATE=====================================

compareDates = function (fromDate, toDate) {
    let from = new Date(fromDate);
    let to = new Date(toDate);
    if (isValidDate(from) && isValidDate(to)) {
        let diff = to.getTime() - from.getTime();
        return diff >= 0 ? diff : null;
    }
    return null;
};
isValidDate = function (d) {
    return d instanceof Date && !isNaN(d);
};
isIsoDate = function (str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str))
        return false;
    const d = new Date(str);
    return !isNaN(d.getTime()) && d.toISOString() === str; // valid date 
};

getCurrentDate = function () {
    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return year + "-" + month + "-" + day;
};

isEmpty = function (data) {
    if (data === null || typeof data === 'undefined') {
        return true;
    } else {
        if (isString(data)) {
            return data.toString().length === 0 || data.toString().toLowerCase() === 'null' ? true : false;
        } else if (Array.isArray(data)) {
            return data.length === 0;
        } else if (isObject(data)) {
            return Object.entries(data).length === 0;
        }
    }
    return false;
};
isString = function (val) {
    try {
        return typeof val === 'string' || val instanceof String ? true : false;
    } catch (Exception) {
        return false;
    }
    return false;
};

isObject = function (val) {
    return val instanceof Object && val.constructor === Object;
};

getLocalWallet = function () {
    let localWallet = getLocal("wallet");
    return isValidETHAddress(localWallet) ? localWallet : null;
};
setLocalWallet = function (walletAddress) {
    if (isValidETHAddress(walletAddress)) {
        createLocal("wallet", walletAddress);
    }
};
fillWallet = function () {
    let wallet = getLocalWallet();
    if (wallet !== null) {
        document.getElementById("wallet").value = wallet;
    }
};

convertMiliseconds = function (miliseconds, format) {
    var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;
    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = parseInt(Math.floor(total_hours / 24));
    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);
    switch (format) {
        case 's':
            return total_seconds;
        case 'm':
            return total_minutes;
        case 'h':
            return total_hours;
        case 'd':
            return days;
        default:
            return {d: days, h: hours, m: minutes, s: seconds};
    }
};
//return profit ration : owner - rentee
getProfitRatio = function (ratio) {
    if (!isEmpty(ratio)) {
        let renteeRatio = Math.round((1 - ratio) * 100);
//        let ownerRatio = ratio * 100;
        let ownerRatio = 100 - renteeRatio;
        return (!isEmpty(ownerRatio) && !isEmpty(renteeRatio)) ? ownerRatio + "-" + renteeRatio : null;
    }
    return null;
};
getOwnerRatio = function (ratio) {
    return !isEmpty(ratio) ? ratio : 0;
};
getRenteeRatio = function (ratio) {
    return !isEmpty(ratio) ? 1 - ratio : 0;
};
getSuccessRate = function (startDate, dsaLevel, mTimes) {
    let currentDate = new Date(getCurrentDate());
    let rentalStart = new Date(startDate);
    var milliseconds = Math.abs(currentDate - rentalStart);
    let diff = convertMiliseconds(milliseconds, "d");
    let success = diff > 0 ? diff * mTimes * dsaLevel * 1000 : 0;
    return success > 0 ? success : 0;
};
getRentalDays = function (startDate, endDate) {
    let currentDate = new Date(getCurrentDate());
    let rentalStart = new Date(startDate);
    var milliseconds = Math.abs(currentDate - rentalStart);
    let diff = convertMiliseconds(milliseconds, "d");
    return diff > 0 ? diff : 0;
};
getMinedRate = function (successRate, dsaMinedFromRentalDay) {
    let result = dsaMinedFromRentalDay / successRate;
    return isNumber(result) ? (result * 100).toFixed(2) : 0;
};
isDecimal = function (num) {
    return (num % 1);
};
//==================================DATATABLES=============================
hideTable = function (tableId) {
    document.getElementById(tableId).style.visibility = "hidden";
};
showTable = function (tableId) {
    document.getElementById(tableId).style.visibility = "visible";
};
objectLength = function (JSONObject) {
    return Object.keys(JSONObject).length;
};
isindexedDBSupported = function () {
    if (('indexedDB' in window)) {
        return true;
    }
    return false;
};
isValidETHAddress = function (str) {
    let regex = new RegExp(/^(0x)?[0-9a-fA-F]{40}$/);
    if (!isEmpty(str)) {
        if (regex.test(str)) {
            return true;
        }
        return false;
    }
    return false;
};
canUseStorage = function (encode) {
    if (typeof Storage !== "undefined") {
        const encoding = encode.toLowerCase() === "utf8" ? 4 : 2;
        //Get used in KB, total is 5120KB
        const used = new Blob(Object.values(localStorage)).size * encoding / 1024;
//        console.log(used);
        if (used < 5000) {
            return true;
        }
        return "full";
    } else {
        return false;
    }
};
getWidth = function () {
    return self.innerWidth ? self.innerWidth :
            document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientWidth :
            document.body ? document.body.clientWidth : 0;
};

selectText = function (element, selected) {
    if (selected) {
        if (window.getSelection && document.createRange) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
};

selectElementsByClass = async function (className) {
    return await document.querySelectorAll('.' + className);
};

setMultipleElementsSelectable = function (ClassesList) {
    let length = ClassesList.length;
    for (let i = 0; i < length; i++) {
        setElementsSelectable(ClassesList[i]);
    }
};

setElementsSelectable = function (className) {
    let isSelected = true;
    const tableContainer = document.getElementById('optionsDatatable');
    const targetClassName = 'name';
    tableContainer.addEventListener('click', function (event) {
        const clickedElement = event.target.closest('.' + className);
        if (clickedElement && isSelected) {
            selectText(clickedElement, isSelected);
            isSelected = false;
        }
    });
};

optionsDatatableListener = async function (datatable) {
    let divsInRow = [], localList = [], rowsList = [];
    datatable.rows({search: 'none'}).every(function () {
        let rowNode = this.node();
        divsInRow = $(rowNode).find('div');
        rowsList.push(divsInRow);
    });
    if (rowsList.length > 0) {
        let length = rowsList.length;
        for (i = 0; i < length; i++) {
            let id = rowsList[i].filter('.id').text().trim();
            let wallet = rowsList[i].filter('.rwallet').text().trim();
            let name = rowsList[i].filter('.name').text().trim();
            let dsaLevel = rowsList[i].filter('.dsaNumber').text().trim();
            let mTimes = rowsList[i].filter('.miningTimesNumber').text().trim();
            let cost = rowsList[i].filter('.cost').text().trim();
            let used = rowsList[i].filter('.used').text().trim();
            let obj = {id: id, name: name, dsaLevel: dsaLevel, mTimes: mTimes, cost: cost, used: used};
            localList.push(obj);
        }
    }
    createLocalDragoOptions("dragoOptions", localList);
    delay(1000);
};

runOptionsDatatable = function (walletId) {
    if (isValidETHAddress(document.getElementById(walletId).value)) {
        openOptionsDatatable(document.getElementById(walletId).value);
    } else {
        let localWallet = getLocalWallet();
        if (localWallet !== null) {
            openOptionsDatatable(localWallet);
        } else {
            popupMessage("Please paste a valid wallet address", 5);
        }
    }
};

openOptionsDatatable = async function (wallet) {
    let dragos = await getAllDragons(wallet);
    let localOptions = readLocalJSONData("dragoOptions");
    let name = "", dsaLevel = "", mTimes = "", cost = 0, used = 0;
    let dragoList = [], datatableList = [], totalData = [], rentalData = [];
    let totalDSAEarned = 0, totalTotalMiningTimes = 0, totalTotalOwnerProfit = 0, totalTotalRentalTimes = 0, totalUnclaimedProfit = 0, rentDragonsNumber = 0, rentTotalDailyMined = 0, rentOwnerTotalProfit = 0, rentOwnerDailyMined = 0, rentTotalDsaEarned = 0, rentTotalMiningTimes = 0, rentDailyMiningTimes = 0, rentTotalCost = 0, rentTotalUsed = 0, sumSuccessRate = 0, avSuccessRate = 0;
    let dragoLength = dragos.length;
    if (dragoLength !== null) {
        let optionsLength = localOptions !== null ? objectLength(localOptions) : -1;
        for (let i = 0; i < dragoLength; i++) {
            let id = dragos[i].tokenId;
            for (var k = 0; k < optionsLength; k++) {
                let localId = localOptions[k].id;
                if (localId.toString() === id.toString()) {
                    name = (dragos[i].wallet === localOptions[k].wallet) && !isEmpty(localOptions[k].name) ? localOptions[k].name : "";
                    dsaLevel = localOptions[k].dsaLevel;
                    mTimes = !isEmpty(localOptions[k].mTimes) ? localOptions[k].mTimes : "";
                    cost = !isEmpty(localOptions[k].cost) ? localOptions[k].cost : cost;
                    used = !isEmpty(localOptions[k].used) ? localOptions[k].used : used;
                    k = optionsLength;
                }
            }
            let fusion = dragos[i].fusion;
            let renteeWallet = !isEmpty(dragos[i].rent.to) ? dragos[i].rent.to : "";
            let type = dragos[i].filter.parts.legendary >= 1 ? "Leg " + dragos[i].filter.parts.legendary + "<br>Fusion " + fusion : "Normal" + "<br>Fusion " + fusion;

            let totalDSA = !isEmpty(dragos[i].rent.stats.totalDSA) ? dragos[i].rent.stats.totalDSA : 0;
            let totalMiningTimes = !isEmpty(renteeWallet) ? dragos[i].rent.stats.totalGathering : 0;
            let totalOwnerProfit = !isEmpty(renteeWallet) ? dragos[i].rent.stats.totalProfit : 0;
            let totalRentalTimes = !isEmpty(renteeWallet) ? dragos[i].rent.stats.totalRental : 0;

            let rentEarnedDSA = !isEmpty(renteeWallet) ? dragos[i].rent.stats.currentDSA : 0;
            let rentMiningTimes = !isEmpty(renteeWallet) ? dragos[i].rent.stats.currentGathering : 0;
            let rentOwnerProfit = !isEmpty(renteeWallet) ? dragos[i].rent.stats.currentProfit : 0;
            let rentStartDate = !isEmpty(renteeWallet) ? getDate(dragos[i].rent.startDate) : "";
            let rentEndDate = !isEmpty(renteeWallet) ? getDate(dragos[i].rent.expireDate) : "";
            let rentalDays = getRentalDays(rentStartDate);
            let rentDailyDSA = !isEmpty(renteeWallet) ? getDailyDSA(rentEarnedDSA, rentalDays) : 0;

            let ownerRatio = !isEmpty(renteeWallet) ? dragos[i].rent.profitShareRatio : 0;
            let actionPoints = type.startsWith("Leg") ? 2 : 1;
            let unclaimedProfit = !isEmpty(renteeWallet) ? dragos[i].rent.stats.unclaimedProfit : 0;
            let breed = dragos[i].breed;
            let parents = dragos[i].parents; // array [first, second]
            let profitRatio = !isEmpty(renteeWallet) ? getProfitRatio(dragos[i].rent.profitShareRatio) : "100-0";

            let currentDSA = dragos[i].rent.stats.currentDSA;
            let fdsaLevel = isValidNumberInRange(dsaLevel, 1, 5) ? dsaLevel : 3;
            let fminingTimes = isValidNumberInRange(mTimes, 1, 5) ? mTimes :
                    type.startsWith("Leg") ? 2 : type.startsWith("Normal") ? 1 : "";
            let successRate = getSuccessRate(rentStartDate, fdsaLevel, fminingTimes);
            let minedRate = getMinedRate(successRate, currentDSA) + " %";

            totalTotalMiningTimes = totalTotalMiningTimes + totalMiningTimes;
            totalTotalOwnerProfit = totalTotalOwnerProfit + totalOwnerProfit;
            totalTotalRentalTimes = totalTotalRentalTimes + totalRentalTimes;
            totalUnclaimedProfit = totalUnclaimedProfit + unclaimedProfit;

            rentOwnerTotalProfit = rentOwnerTotalProfit + rentOwnerProfit;
            rentOwnerDailyMined = rentOwnerDailyMined + (rentDailyDSA * ownerRatio);
            totalDSAEarned = totalDSAEarned + totalDSA;
            rentTotalMiningTimes = rentTotalMiningTimes + rentMiningTimes;

            rentDailyMiningTimes = !isEmpty(renteeWallet) ? getRentDailyMiningTimes(rentMiningTimes, rentalDays) : 0;
            rentTotalDailyMined = rentTotalDailyMined + rentDailyDSA;
            rentTotalDsaEarned = !isEmpty(renteeWallet) ? rentTotalDsaEarned + rentEarnedDSA : rentTotalDsaEarned;
            sumSuccessRate = parseFloat(sumSuccessRate) + parseFloat(minedRate);

            let obj = {id: id, type: type, cost: cost, used: used, wallet: renteeWallet, name: name, dsaLevel: fdsaLevel, mTimes: fminingTimes, profitRatio: profitRatio};
            dragoList.push(obj);
            name = "", dsaLevel = "", mTimes = "", cost = 0, used = 0;
            if (i === dragoLength - 1) {
                rentDragonsNumber = await countRentalDragons(wallet);
                avSuccessRate = parseFloat(parseFloat(sumSuccessRate) / parseInt(rentDragonsNumber)).toFixed(2);
                totalData = [{label: "Dragons Number", val: dragoLength}, {label: "Total DSA", val: totalDSAEarned}, {label: "Total Owner DSA", val: totalTotalOwnerProfit}, {label: "Total Rental Times", val: totalTotalRentalTimes}, {label: "Total Gathering Times", val: totalTotalMiningTimes}, {label: "Total Unclaimed Profit", val: totalUnclaimedProfit}, {label: "Total Cost", val: Math.round(rentTotalCost)}, {label: "Total Used", val: Math.round(rentTotalUsed)}];
                rentalData = [{label: "Dragons Number", val: rentDragonsNumber}, {label: "Total DSA", val: rentTotalDsaEarned}, {label: "Total Owner DSA", val: rentOwnerTotalProfit}, {label: "Total Daily DSA", val: rentTotalDailyMined}, {label: "Total Daily Owner DSA", val: Math.round(rentOwnerDailyMined)}, {label: "Total Gathering Times", val: rentTotalMiningTimes}, {label: "Average Success Rate", val: avSuccessRate + ' %'}];
            }
        }
    }
    let table = null;
    if (dragoList.length > 0) {
        let length = dragoList.length;
        let row = 0;
        for (let i = 0; i < length; i++) {
            datatableList[row] = [
                '<div class="image"><img class="photo" loading="lazy" src= "' + getDragoImage(dragoList[i].id) + '" alt="Drago Image"/></div>',
                '<div class="id">' + dragoList[i].id + '</div>',
                '<div class="type">' + dragoList[i].type + '</div>',
                '<div class="cost" contenteditable="true" spellcheck="false">' + dragoList[i].cost + '</div>',
                '<div class="used" contenteditable="true" spellcheck="false">' + dragoList[i].used + '</div>',
                '<div class="rwallet" data-full="' + dragoList[i].wallet + '">' + hideWallet(dragoList[i].wallet) + '</div>',
                '<div class="name" contenteditable="true" spellcheck="false">' + dragoList[i].name + '</div>',
                '<div class="dsaNumber" contenteditable="true" spellcheck="false">' + dragoList[i].dsaLevel + '</div>',
                '<div class="miningTimesNumber" contenteditable="true" spellcheck="false">' + dragoList[i].mTimes + '</div>',
                '<div class="profitRatio">' + dragoList[i].profitRatio + '</div>'];
            row++;
        }
    } else {
        console.log("No Data");
    }
    var customPanelTotal = totalData.map(function (item) {
        return {
            label: replaceUndefined(item.label) + ": " + replaceUndefined(item.val),
            // The value function ensures no filtering occurs
            value: function (rowData, rowIdx) {
                return true;
            }
        };
    });
    var customPanelRental = rentalData.map(function (item) {
        return {
            // The label is what is displayed in the pane
            label: item.label + ": " + item.val,
            // The value function ensures no filtering occurs
            value: function (rowData, rowIdx) {
                return true;
            }
        };
    });
    let element = document.getElementById("optionsDatatable");
    let historyStack = [];
    if (!element.hasChildNodes()) {
        $.fn.DataTable.ext.pager.numbers_length = 5;
        $.extend($.fn.dataTable.ext.type.order, {
            'profit-ratio-sort-pre': function (data) {
                const val = $('<div>').html(data).text().trim();
                const result = parseInt(val.split(".")[0], 10) || 0;
                return result;
            }
        });
        table = $('#optionsDatatable').DataTable({
            data: datatableList,
            responsive: false,
            serverSide: false,
            aaSorting: [1, 'asc'],
            lengthMenu: [25, 50, 75, 100, -1],
            pageLength: 100,
            "language": {
                search: "",
                searchPlaceholder: "Search"
            },
            columnDefs: [
                {targets: [3, 4, 6, 7, 8], createdCell: function (td, cellData, rowData, row, col) {
                        $(td).find('div').attr('contenteditable', true).addClass('editable-cell');
                    }},
                {className: "dt-head-center", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
                {className: "center-align-data", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
                {className: 'dt-body-center', "targets": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
                {searchPanes: {header: cImage, show: false}, targets: [0]},
                {searchPanes: {header: cId, show: false}, targets: [1]},
                {searchPanes: {header: cType, show: false}, targets: [2]},
                {searchPanes: {header: cCost, show: false}, targets: [3]},
                {searchPanes: {header: cDsaUsed, show: false}, targets: [4]},
                {searchPanes: {header: cRenteeWallet, show: true}, targets: [5],
                    render: function (data, type, row, meta) {
                        return $(data).attr('data-full');
                    }
                },
                {searchPanes: {header: cName, show: true}, targets: [6]},
                {searchPanes: {header: cDSALevel, show: false}, targets: [7]},
                {searchPanes: {header: cMiningTimes, show: false}, targets: [8]},
                {searchPanes: {header: cProfitRatio, show: false}, targets: [9], type: 'profit-ratio-sort', orthogonal: {display: 'display'},
                    render: function (data, type, row) {
                        return type === 'filter' ? $('<div>').html(data).text().trim() : data;
                    }},
                {targets: ['_all'], orderSequence: ['asc', 'desc']}
            ],
            initComplete: function () {
                this.api().column(5).nodes().to$().each(function () {
                    var fullAddress = $(this).text();
                    var shortAddress = fullAddress.substring(0, 6) + '...' + fullAddress.substring(fullAddress.length - 5);
                    $(this).html('<div class="rwallet" data-full="' + fullAddress + '">' + shortAddress + '</div>');
                });
            },
            "order": [[1, "asc"]],
            columns: [
                {title: cImage},
                {title: cId},
                {title: cType},
                {title: cCost},
                {title: cDsaUsed},
                {title: cRenteeWallet},
                {title: cName},
                {title: cDSALevel},
                {title: cMiningTimes},
                {title: cProfitRatio}
            ],
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: 'Excel',
                    text: 'Get Excel',
                    //Columns to export
                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6, 7, 8, 9]
                    }
                }
            ],
            searchPanes: {
                order: [cTotalPeriod, cRentalPeriod, cRenteeWallet, cName],
                panes: [
                    {
                        header: cTotalPeriod,
                        className: 'noClickablePane',
                        options: customPanelTotal,
                        dtOpts: {
                            searching: false,
                            ordering: false,
                            info: false,
                            paging: false
                        },
                        orthogonal: 'sp'
                    },
                    {
                        header: cRentalPeriod,
                        className: 'noClickablePane',
                        options: customPanelRental,
                        dtOpts: {
                            searching: false,
                            ordering: false,
                            info: false,
                            paging: false
                        },
                        orthogonal: 'sp'
                    }
                ],
                viewTotal: true,
                controls: false,
                cascadePanes: true,
                i18n: {
                    title: filtersTitle,
                    showMessage: showMessage,
                    loadMessage: loadMessage,
                    emptyPanes: emptyPanes,
                    emptyMessage: emptyMessage,
                    collapseMessage: collapseMessage,
                    clearMessage: clearMessage,
                    count: '{total}',
                    countFiltered: '{shown} ({total})'
                }
            },
            dom: '<"colSearchPanes"<"searchPanes"P><"topBar"Blfp>>',
            "pagingType": "simple_numbers",
            "bAutoWidth": true,
            "bAutoHeight": true,
            "bProcessing": true
        }).columns.adjust();
    } else {
        table = $('#optionsDatatable').DataTable().clear().rows.add(datatableList).draw().order([1, 'asc']).responsive(false).columns.adjust().draw();
        table.searchPanes.rebuildPane();
    }
    function saveState(rowIndex, columnIndex, oldValue) {
        if (historyStack.length >= MAX_HISTORY) {
            historyStack.shift();
        }
        historyStack.push({row: rowIndex, col: columnIndex, value: oldValue});
    }

    function undo() {
        if (historyStack.length === 0) {
            console.log("Nothing to undo.");
            return;
        }
        const lastAction = historyStack.pop();
        const cell = table.cell({row: lastAction.row, column: lastAction.col});
        cell.data(lastAction.value, false);

        const tdNode = cell.node();
        const $editableDiv = $(tdNode).find('.editable-cell');
        $editableDiv.text(lastAction.value);
        $editableDiv.focus();
        tdNode.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
    $('#optionsDatatable tbody').on('focusin', 'td', function (e) {
        const cell = table.cell(this);
        $(this).data('old-value', cell.data());
    });

    $('#optionsDatatable tbody').on('focusout', 'td', function (e) {
        const cell = table.cell(this);
        const oldValue = $(this).data('old-value');
        const newContent = this.textContent;
        const $nestedDiv = $(this).find('div').text(newContent);
        const newValue = $nestedDiv.prop('outerHTML');
        if (oldValue !== undefined && oldValue !== newValue) {
            cell.data(newValue, false);
            const index = cell.index();
            saveState(index.row, index.column, oldValue);
        }
        $(this).removeData('old-value');
    });
    $(document).on('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
            e.preventDefault();
            undo();
        }
    });

};

isNumber = function (value) {
    if (value === null)
        return false;
    if (typeof value === 'number')
        return isFinite(value);
    if (typeof value !== 'string')
        return false;
    const s = value.trim();
    if (s === '')
        return false;
    return isFinite(Number(s));                         // covers "2e5", "-3.14", etc.
};

getDailyDSA = function (currentDSA, gatheringDays) {
    return isNumber(currentDSA) && isNumber(gatheringDays) ? Math.round(Number((Number(currentDSA) / Number(gatheringDays)))) : 0;
};

hideWallets = function () {
    $('#optionsDatatable, #dragoDatatable').on('draw.dt', function () {
        document.querySelectorAll('.rwallet').forEach(div => {
            const fullText = div.textContent.trim();
            if (fullText.length === 0)
                return;

            if (fullText.length > 15) {
                const start = fullText.slice(0, 5);
                const end = fullText.slice(-5);
                div.dataset.full = fullText;
                div.textContent = `${start}...${end}`;
            }
        });
    });
};

hideWallet = function (wallet) {
    const fullText = wallet.trim();
    return fullText.length > 15 ? fullText.slice(0, 5) + '...' + fullText.slice(-5) : "";
};

hidePopupWallet = function (wallet) {
    const fullText = wallet.trim();
    return fullText.length > 15 ? '...'+fullText.slice(30): "";
};

getRentDailyMiningTimes = function (rentMiningTimes, rentalDays) {
    return rentMiningTimes > 0 && rentalDays > 0 ? Number(rentMiningTimes / rentalDays).toFixed(2) : 0;

};
runDragoDatatable = function (walletId) {
    if (isValidETHAddress(document.getElementById(walletId).value)) {
        openDragoDatatable(document.getElementById(walletId).value);
    } else {
        let localWallet = getLocalWallet();
        if (localWallet !== null) {
            openDragoDatatable(localWallet);
        } else {
            popupMessage("Please paste a valid wallet address", 5);
        }
    }
};
replaceUndefined = function (str) {
    return !isEmpty(str) ? str : "";
};

openDragoDatatable = async function (wallet) {
    let count = 0, name = "", dsaLevel = 3, mTimes = 1, cost = 0, used = 0, dragoList = [], datatableList = [], totalData = [], rentalData = [];
    let totalDSAEarned = 0, totalTotalMiningTimes = 0, totalTotalOwnerProfit = 0, totalTotalRentalTimes = 0, totalUnclaimedProfit = 0, rentDragonsNumber = 0, rentTotalDailyMined = 0, rentOwnerTotalProfit = 0, rentOwnerDailyMined = 0, rentTotalDsaEarned = 0, rentTotalMiningTimes = 0, rentDailyMiningTimes = 0, rentTotalCost = 0, rentTotalUsed = 0, sumSuccessRate = 0, avSuccessRate = 0;
    let dragos = await getAllDragons(wallet);
//    console.log(dragos);
    let length = dragos.length;
    let spTotalDragonsNumber = length > 0 ? length : 0;
    let localOptions = readLocalJSONData("dragoOptions");
    let optionsLength = localOptions !== null ? objectLength(localOptions) : -1;
    for (var i = 0; i < length; i++) {
        let id = dragos[i].tokenId;
        for (var k = 0; k < optionsLength; k++) {
            let localId = localOptions[k].id;
            if (localId.toString() === id.toString()) {
                name = dragos[i].wallet === localOptions[k].wallet ? localOptions[k].name : "";
                dsaLevel = localOptions[k].dsaLevel;
                mTimes = localOptions[k].mTimes;
                cost = !isEmpty(localOptions[k].cost) ? parseInt(localOptions[k].cost) : 0;
                used = !isEmpty(localOptions[k].used) ? parseInt(localOptions[k].used) : 0;
                rentTotalCost = rentTotalCost + cost;
                rentTotalUsed = rentTotalUsed + used;
                k = optionsLength;
            }
        }
        let fusion = dragos[i].fusion;
        let renteeWallet = dragos[i].rent.to !== null ? dragos[i].rent.to : "";
        let type = dragos[i].filter.parts.legendary >= 1 ? "Leg " + dragos[i].filter.parts.legendary + "<br>Fusion " + fusion : "Normal" + "<br>Fusion " + fusion;
        let level = dragos[i].level;
        dsaLevel = dsaLevel.length > 0 ? dsaLevel : 3;
        mTimes = mTimes.length > 0 ? mTimes : type.startsWith("Leg") ? 2 : 1;

        let totalDSA = !isEmpty(dragos[i].rent.stats.totalDSA) ? dragos[i].rent.stats.totalDSA : 0;
        let totalMiningTimes = !isEmpty(renteeWallet) ? dragos[i].rent.stats.totalGathering : 0;
        let totalOwnerProfit = !isEmpty(renteeWallet) ? dragos[i].rent.stats.totalProfit : 0;
        let totalRentalTimes = !isEmpty(renteeWallet) ? dragos[i].rent.stats.totalRental : 0;

        let rentEarnedDSA = !isEmpty(renteeWallet) ? dragos[i].rent.stats.currentDSA : 0;
        let rentMiningTimes = !isEmpty(renteeWallet) ? dragos[i].rent.stats.currentGathering : 0;
        let rentOwnerProfit = !isEmpty(renteeWallet) ? dragos[i].rent.stats.currentProfit : 0;
        let rentStartDate = !isEmpty(renteeWallet) ? getDate(dragos[i].rent.startDate) : "";
        let rentEndDate = !isEmpty(renteeWallet) ? getDate(dragos[i].rent.expireDate) : "";
        let rentalDays = getRentalDays(rentStartDate);
        let rentDailyDSA = !isEmpty(renteeWallet) ? getDailyDSA(rentEarnedDSA, rentalDays) : 0;

        let ownerRatio = !isEmpty(renteeWallet) ? dragos[i].rent.profitShareRatio : 0;
        let actionPoints = type.startsWith("Leg") ? 2 : 1;

        let unclaimedProfit = !isEmpty(renteeWallet) ? dragos[i].rent.stats.unclaimedProfit : 0;
        let breed = dragos[i].breed;
        let parents = dragos[i].parents; // array [first, second]
        let profitRatio = !isEmpty(renteeWallet) ? getProfitRatio(dragos[i].rent.profitShareRatio) : "100-0";

        let contractPeriod = !isEmpty(renteeWallet) ? rentStartDate + "<br>" + rentEndDate : "";
        let fdsaLevel = isValidNumberInRange(dsaLevel, 1, 5) ? dsaLevel : 3;
        let fminingTimes = isValidNumberInRange(mTimes, 1, 5) ? mTimes :
                type.startsWith("Leg") ? 2 : type.startsWith("Normal") ? 1 : "";

        let successRate = getSuccessRate(rentStartDate, fdsaLevel, fminingTimes);
        let minedRate = getMinedRate(successRate, rentEarnedDSA);

        totalTotalMiningTimes = totalTotalMiningTimes + totalMiningTimes;
        totalTotalOwnerProfit = totalTotalOwnerProfit + totalOwnerProfit;
        totalTotalRentalTimes = totalTotalRentalTimes + totalRentalTimes;
        totalUnclaimedProfit = totalUnclaimedProfit + unclaimedProfit;

        rentOwnerTotalProfit = rentOwnerTotalProfit + rentOwnerProfit;
        rentOwnerDailyMined = rentOwnerDailyMined + (rentDailyDSA * ownerRatio);
        totalDSAEarned = totalDSAEarned + totalDSA;
        rentTotalMiningTimes = rentTotalMiningTimes + rentMiningTimes;

        rentDailyMiningTimes = !isEmpty(renteeWallet) ? getRentDailyMiningTimes(rentMiningTimes, rentalDays) : 0;
        rentTotalDailyMined = rentTotalDailyMined + rentDailyDSA;
        rentTotalDsaEarned = !isEmpty(renteeWallet) ? rentTotalDsaEarned + rentEarnedDSA : rentTotalDsaEarned;
        sumSuccessRate = parseFloat(sumSuccessRate) + parseFloat(minedRate);

        let data = {id: id, type: type, wallet: renteeWallet, name: name, level: level, profitRatio: profitRatio, contractPeriod: contractPeriod, totalDSA: totalDSA, totalMiningTimes: totalMiningTimes, totalOwnerProfit: totalOwnerProfit, rentDailyMiningTimes: rentDailyMiningTimes, rentMiningTimes: rentMiningTimes, rentEarnedDSA: rentEarnedDSA, rentDailyDSA: rentDailyDSA, minedRate: minedRate, fusion: fusion, breed: breed, parents: parents};
        dragoList.push(data);

        if (i === length - 1) {
            rentDragonsNumber = await countRentalDragons(wallet);
            avSuccessRate = parseFloat(parseFloat(sumSuccessRate) / parseInt(rentDragonsNumber)).toFixed(2);
            totalData = [{label: "Dragons Number", val: length}, {label: "Total DSA", val: totalDSAEarned}, {label: "Total Owner DSA", val: totalTotalOwnerProfit}, {label: "Total Rental Times", val: totalTotalRentalTimes}, {label: "Total Gathering Times", val: totalTotalMiningTimes}, {label: "Total Unclaimed Profit", val: totalUnclaimedProfit}, {label: "Total Cost", val: Math.round(rentTotalCost)}, {label: "Total Used", val: Math.round(rentTotalUsed)}];
            rentalData = [{label: "Dragons Number", val: rentDragonsNumber}, {label: "Total DSA", val: rentTotalDsaEarned}, {label: "Total Owner DSA", val: rentOwnerTotalProfit}, {label: "Total Daily DSA", val: rentTotalDailyMined}, {label: "Total Daily Owner DSA", val: Math.round(rentOwnerDailyMined)}, {label: "Total Gathering Times", val: rentTotalMiningTimes}, {label: "Average Success Rate", val: avSuccessRate + ' %'}];
        }
    }
    let dragoListLength = dragoList.length;
    for (let x = 0; x < dragoListLength; x++) {
        let tableMined = !isEmpty(dragoList[x].minedRate) && dragoList[x].minedRate < 80 && !isEmpty(dragoList[x].wallet) ?
                '<div class="successRate redCell">' + dragoList[x].minedRate + ' %</div>' :
                !isEmpty(dragoList[x].minedRate) && dragoList[x].minedRate >= 80 && !isEmpty(dragoList[x].wallet) ?
                '<div class="successRate">' + dragoList[x].minedRate + ' %</div>' : '<div class="successRate">' + dragoList[x].minedRate + ' %</div>';
        datatableList[x] = [
            '<div class="image"><img  class="photo" loading="lazy" src= "' + getDragoImage(dragoList[x].id) + '" alt="Drago Image"/></div>',
            '<div class="id">' + dragoList[x].id + '</div>',
            '<div class="level">' + dragoList[x].level + '</div>',
            '<div class="type">' + dragoList[x].type + '</div>',
            '<div class="rwallet" data-full="' + dragoList[x].wallet + '">' + hideWallet(dragoList[x].wallet) + '</div>',
            '<div class="name">' + dragoList[x].name + '</div>',
            '<div class="profitRatio">' + dragoList[x].profitRatio + '</div>',
            '<div class="contractPeriod">' + dragoList[x].contractPeriod + '</div>',
            '<div class="rentDailyMiningTimes">' + dragoList[x].rentDailyMiningTimes + '</div>',
            '<div class="rentMiningTimes">' + dragoList[x].rentMiningTimes + '</div>',
            '<div class="rentEarnedDSA">' + dragoList[x].rentEarnedDSA + '</div>',
            '<div class="rentDailyDSA">' + dragoList[x].rentDailyDSA + '</div>',
            tableMined
        ];
    }

    var customPanelTotal = totalData.map(function (item) {
        return {
            label: replaceUndefined(item.label) + ": " + replaceUndefined(item.val),
            // The value function ensures no filtering occurs
            value: function (rowData, rowIdx) {
                return true;
            }
        };
    });
    var customPanelRental = rentalData.map(function (item) {
        return {
            // The label is what is displayed in the pane
            label: item.label + ": " + item.val,
            // The value function ensures no filtering occurs
            value: function (rowData, rowIdx) {
                return true;
            }
        };
    });
    let element = document.getElementById("dragoDatatable");
    if (!element.hasChildNodes()) {
        $.fn.DataTable.ext.pager.numbers_length = 5;
        $.extend($.fn.dataTable.ext.type.order, {
            'profit-ratio-sort-pre': function (data) {
                const val = $('<div>').html(data).text().trim();
                const result = parseInt(val.split(".")[0], 10) || 0;
                return result;
            },
            'success-rate-sort-pre': function (data) {
                const val = $('<div>').html(data).text().trim();
                return !val ? 0 : parseInt(val.split(".")[0], 10) || 0;
            }
        });
        table = $('#dragoDatatable').DataTable({
            deferRender: true,
            data: datatableList,
            responsive: false,
            serverSide: false,
            aaSorting: [1, 'asc'],
            lengthMenu: [25, 50, 75, 100, -1],
            pageLength: 100,
            language: {
                search: "",
                searchPlaceholder: "Search",
                decimal: ',',
                thousands: '.'
            },
            "columnDefs": [
                {className: "dt-head-center dt-body-center dt-type-numeric", targets: ['_all']},
                {searchPanes: {header: cImage, show: false}, targets: [0]},
                {searchPanes: {header: cId, show: false}, targets: [1]},
                {searchPanes: {header: cLevel, show: false}, targets: [2]},
                {searchPanes: {header: cType, show: false}, targets: [3]},
                {searchPanes: {header: cRenteeWallet, show: true}, targets: [4],
                    render: function (data, type, row, meta) {
                        return $(data).attr('data-full');
                    }
                },
                {searchPanes: {header: cName, show: true}, targets: [5]},
                {searchPanes: {header: cProfitRatio, show: false}, targets: [6], type: 'profit-ratio-sort', orthogonal: {display: 'display'},
                    render: function (data, type, row) {
                        return type === 'filter' ? $('<div>').html(data).text().trim() : data;
                    }},
                {searchPanes: {header: cContractPeriod, show: false}, targets: [7]},
                {searchPanes: {header: cRentDailyMiningTimes, show: false}, targets: [8]},
                {searchPanes: {header: cRentMiningTimes, show: false}, targets: [9]},
                {searchPanes: {header: cRentEarnedDSA, show: false}, targets: [10]},
                {searchPanes: {header: cRentDailyDSA, show: false}, targets: [11]},
                {searchPanes: {header: cRentMinedRate, show: true}, targets: [12], type: 'success-rate-sort', orthogonal: {display: 'display'},
                    render: function (data, type, row) {
                        return type === 'filter' ? $('<div>').html(data).text().trim() : data;
                    }},
                {targets: ['_all'], orderSequence: ['asc', 'desc']}

            ],
            initComplete: function () {
                var api = this.api();
                api.column(4).nodes().to$().each(function () {
                    var fullAddress = $(this).text();
                    var shortAddress = fullAddress.substring(0, 6) + '...' + fullAddress.substring(fullAddress.length - 5);
                    $(this).html('<div class="rwallet" data-full="' + fullAddress + '">' + shortAddress + '</div>');
                });
            },
            columns: [
                {title: cImage},
                {title: cId},
                {title: cLevel},
                {title: cType},
                {title: cRenteeWallet},
                {title: cName},
                {title: cProfitRatio},
                {title: cContractPeriod},
                {title: cRentDailyMiningTimes},
                {title: cRentMiningTimes},
                {title: cRentEarnedDSA},
                {title: cRentDailyDSA},
                {title: cRentMinedRate}
            ],
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: 'Excel',
                    text: 'Get Excel',
                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                    }
                }
            ],
            searchPanes: {
                order: [cTotalPeriod, cRentalPeriod, cRenteeWallet, cName, cRentMinedRate],
                panes: [
                    {
                        header: cTotalPeriod,
                        className: 'noClickablePane',
                        options: customPanelTotal,
                        dtOpts: {
                            searching: false,
                            ordering: false,
                            info: false,
                            paging: false
                        },
                        orthogonal: 'sp'
                    },
                    {
                        header: cRentalPeriod,
                        className: 'noClickablePane',
                        options: customPanelRental,
                        dtOpts: {
                            searching: false,
                            ordering: false,
                            info: false,
                            paging: false
                        },
                        orthogonal: 'sp'
                    }
                ],
                viewTotal: true,
                controls: false,
                cascadePanes: true,
                i18n: {
                    title: filtersTitle,
                    showMessage: showMessage,
                    loadMessage: loadMessage,
                    emptyPanes: emptyPanes,
                    emptyMessage: emptyMessage,
                    collapseMessage: collapseMessage,
                    clearMessage: clearMessage,
                    count: '{total}',
                    countFiltered: '{shown} ({total})'
                }
            },
            dom: '<"colSearchPanes"<"searchPanes"P><"topBar"Blfp>>',
            pagingType: "simple_numbers",
            bAutoWidth: true,
            bAutoHeight: true,
            bProcessing: true
        });
    } else {
        table = $('#dragoDatatable').DataTable().clear().rows.add(datatableList).draw().order([1, 'asc']).responsive(false).columns.adjust().draw();
        table.searchPanes.rebuildPane();
    }
    redRows();
};

redRows = function () {
    let redCells = document.getElementsByClassName("redCell");
    for (var i = 0; i < redCells.length; i++) {
        let row = redCells[i].closest("td").parentNode;
        row.style.border = "2px solid red";
    }
};
copyContent = async function (val, contentType) {
    try {
        await navigator.clipboard.writeText(val);
        popupMessage('The ' + contentType + ' copied to clipboard', '2');
    } catch (err) {
        popupMessage('The ' + contentType + ' failed to copy: ' + err, '2');
    }
};
checkValidInput = async function (datatableId) {
    const table = await document.getElementById(datatableId);
    const oldValues = new WeakMap();
    if (!table) {
        console.error("❌ ERROR: Table not found.");
        return;
    }
    $('#' + datatableId).on('focusin', 'div.dsaNumber[contenteditable], div.miningTimesNumber[contenteditable]', function () {
        oldValues.set(this, $(this).text().trim());
    });
    $('#' + datatableId).on('keypress', 'div.cost[contenteditable], div.used[contenteditable]', function (e) {
        if (isNaN(String.fromCharCode(e.which))) {
            popupMessage('Please type a valid Integer', 2);
            e.preventDefault();
        }
    });
    $('#' + datatableId).on('input', 'div.name[contenteditable], div.dsaNumber[contenteditable], div.miningTimesNumber[contenteditable]', function (e) {
        let className = this.getAttribute('class');
        let val = this.textContent;
        const keyCode = e.keyCode;
        if (keyCode === 8 || keyCode === 46 || keyCode === 9) {
            return true; // Allow the action (backspace, delete, navigation)
        }
        if (className.toLowerCase().startsWith('name')) {
            if (!isValidStringLength(val, MAXNAMELENGTH)) {
                let updatedVal = val.slice(0, MAXNAMELENGTH);
                this.textContent = updatedVal;
                popupMessage("Maximum " + MAXNAMELENGTH + " characters allowed.", 2);
                updateOptionsCell(datatableId, this, updatedVal);
            }
        } else if (className.toLowerCase().startsWith('dsanumber')) {
            if (!isValidEmptyOrNumberInRange(val, MINDSALEVEL, MAXDSALEVEL)) {
                const oldValue = oldValues.get(this) || '3';
                this.textContent = oldValue;
                popupMessage('DSA Level should be in range ' + MINDSALEVEL + ' to ' + MAXDSALEVEL, 2);
                updateOptionsCell(datatableId, this, oldValue);
            }
        } else if (className.toLowerCase().startsWith('miningtimesnumber')) {
            if (!isValidEmptyOrNumberInRange(val, MINMININGTIMES, MAXMININGTIMES)) {
                const oldValue = oldValues.get(this) || '1';
                this.textContent = oldValue;
                popupMessage('Mining Times should be in range ' + MINMININGTIMES + ' to ' + MAXMININGTIMES, 2);
                updateOptionsCell(datatableId, this, oldValue);
            }
        }
    });
    $('#' + datatableId).on('blur', 'div.dsaNumber[contenteditable], div.miningTimesNumber[contenteditable]', function () {
        let className = this.getAttribute('class');
        let val = this.textContent;
        if (className.toLowerCase().startsWith('dsanumber')) {
            const oldValue = oldValues.get(this) || '3';
            if (!isValidEmptyOrNumberInRange(val, MINDSALEVEL, MAXDSALEVEL)) {
                this.textContent = oldValue;
                popupMessage('DSA Level should be in range ' + MINDSALEVEL + ' to ' + MAXDSALEVEL, 2);
                updateOptionsCell(datatableId, this, oldValue);
            } else {
                updateOptionsCell(datatableId, this, val);
            }
        } else if (className.toLowerCase().startsWith('miningtimesnumber')) {
            const oldValue = oldValues.get(this) || '1';
            if (!isValidEmptyOrNumberInRange(val, MINMININGTIMES, MAXMININGTIMES)) {
                this.textContent = oldValue;
                popupMessage('Mining Times should be in range ' + MINMININGTIMES + ' to ' + MAXMININGTIMES, 2);
                updateOptionsCell(datatableId, this, oldValue);
            } else {
                updateOptionsCell(datatableId, this, val);
            }
        }
    });
};
function updateOptionsCell(datatableId, $div, newValue) {
    const table = $('#' + datatableId).DataTable();
    const td = $div.closest('td')[0];
    if (td) {
        const cell = table.cell(td);
        const currentHtml = $(cell.node()).html();
        cell.data(currentHtml).draw(false);
    }
}
isValidStringLength = function (str, max) {
    return str.length < max ? true : false;
};
isValidNumberInRange = function (number, min, max) {
    return number >= min && number <= max ? true : false;
};
isValidEmptyOrNumberInRange = function (number, min, max) {
    return (Number(number) >= min && Number(number) <= max) || number === "" ? true : false;
};
/*========================================LOCAL STORAGE========================================*/

createLocal = function (name, value) {
    removeLocal(name);
    localStorage.setItem(name, value);
};
createLocalFromArray = function (name, arr) {
    let length = arr.length;
    let strng = "";
    for (var i = 0; i < length; i++) {
        if (i < length - 1) {
            strng += arr[i] + " ";
        } else {
            strng += arr[i];
        }
    }
    removeLocal(name);
    if (strng.length > 0) {
        createLocal(name, strng);
    }
};
localExists = function (name) {
    return localStorage.getItem(name) ? true : false;
};
getLocal = function (name) {
    let val = localStorage.getItem(name);
    if (!isEmpty(val)) {
        return val;
    }
    return null;
};
removeLocal = function (name) {
    localStorage.removeItem(name);
};
removeValFromLocal = function (name, val) {
    let contents = getLocal("lands").split(" ").filter(Boolean);
    if (includeNonCaseSensitive(contents, val)) {
        let vals = removeAllItemsFromArray(contents, val);
        createLocalFromArray(name, vals);
    }
};
clearLocal = function () {
    localStorage.clear();
};
createLocalJSONData = function (name, dragoList) {
    if (dragoList.length > 0) {
        removeLocal(name);
        localStorage.setItem(name, JSON.stringify(dragoList));
        delay(1000);
        return true;
    } else {
        console.log("empty drago list");
        return false;
    }
};
readLocalJSONData = function (name) {
    if (localExists(name)) {
        let data = localStorage.getItem(name);
        let obj = JSON.parse(data);
        return obj;
    }
    return null;
};
createLocalDragoOptions = function (name, dragoList) {
    let length = dragoList.length;
    let dragons = [];
    for (let i = 0; i < length; i++) {
        let obj = {id: dragoList[i].id, name: dragoList[i].name, dsaLevel: dragoList[i].dsaLevel, mTimes: dragoList[i].mTimes, cost: dragoList[i].cost, used: dragoList[i].used};
        dragons.push(obj);
    }
    /*create an array with object like {id:id, name:name, dsaLevel : dsaLevel, mTimes:mTimes}*/
    if (createLocalJSONData(name, dragons)) {
        return true;
    }
    ;
    return false;
};
let lastPopup = {
    message: null,
    timestamp: 0
};

popupMessage = function (message, seconds) {
    const now = Date.now();
    let popup = document.getElementById('popupMessage');
    const $currentMsg = $(popup).find('p.flex-1');
    if (now - lastPopup.timestamp < 10000 && $currentMsg.text().trim() === message.trim()) {
        return;
    }
    lastPopup.message = message;
    lastPopup.timestamp = now;
    $(popup).stop(true, true).fadeOut(0).empty();

    let content = '<div class="w-full flex flex-col items-center space-y-4 sm:items-end">\n\
                        <div class=" w-full bg-white shadow-lg rounded-lg border border-gray-500 pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">\n\
                            <div class="p-4">\n\
                            <div class="ml-4 flex-shrink-0 flex flex-row-reverse">\n\
                                <button id="closeMessagePopUp" class="bg-white rounded-md inline-flex text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">\n\
                                    <span class="sr-only">Close</span>\n\
                                    <!-- Heroicon name: solid/x -->\n\
                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">\n\
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />\n\
                                    </svg>\n\
                                </button>\n\
                                </div>\n\
                            <div class="flex items-start px-4">\n\
                                <div class=" flex-1 flex justify-between"> \n\
                                <p class=" flex-1 text-sm font-medium text-black">' + message + '</p>\n\
                                </div>\n\
                            </div>\n\
                            </div>\n\
                        </div>\n\
                    </div>';
//    $('#popupMessage').empty();
    popup.insertAdjacentHTML('beforeend', content);
    $('#popupMessage').fadeIn(1000).delay(seconds * 1000).fadeOut(500);
    $(document).on('click', '#closeMessagePopUp', function (e) {
        e.preventDefault();
        document.getElementById('popupMessage').style.display = "none";
    });
};
