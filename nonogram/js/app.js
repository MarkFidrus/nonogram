let valuesOfRows = [];
let headersOfRows = [];
let headersOfColumns = [];

let amountOfMistakes, recentType;

for (const item of document.getElementsByClassName('menu-item')) {
    item.onclick = () => {
        selectedType(item);
    }
}

function selectedType(item)
{
    amountOfMistakes = 0;

    recentType = item;

    clearTable();

    clearValues();

    let tableSize = getTableSize(item);

    createTable(tableSize[0], tableSize[1]);

    generateTableValues(tableSize[0], tableSize[1]);

    setHeadersInfo(tableSize[0], tableSize[1]);

    setClickEventsToFields();
}

function getTableSize(item)
{
    let splitTableId = item.id.split('_');

    let amountOfRowsAndFields = splitTableId[1].split('x');

    return amountOfRowsAndFields;
}

function createTable(amountOfRows, amountOfColumns)
{

    let table = document.getElementById('table');
    table.style.border = '1px solid #000';
    for (let i = -1; i < amountOfRows; i++)
    {
        let row = document.createElement('tr');
        for (let j = -1; j < amountOfColumns; j++)
        {
            let field, valueField;
            if (j === -1 && i !== -1)
            {
                field = document.createElement('th');
                field.className = 'rHeader table-item';
            }
            else if (i === -1)
            {
                field = document.createElement('th');
                field.className = 'cHeader table-item';
            }
            else 
            {
                field = document.createElement('td');
                field.className = 'field table-item';

                valueField = document.createElement('input');
                valueField.type = 'hidden';
                valueField.value = (i) + '-' + (j);

                field.append(valueField);
            }
            row.appendChild(field);
        }
        table.appendChild(row);
    }
}

function generateTableValues(amountOfRows, amountOfColumns)
{
    for (let i = 0; i < amountOfRows; i++)
    {
        let generatedRowValues = [];
        for (let j = 0; j < amountOfColumns; j++)
        {
            generatedRowValues.push(Math.floor(Math.random()*2));
        }
        valuesOfRows.push(generatedRowValues);
    }
    //console.log(valuesOfRows);
}

function setHeadersInfo()
{
    setHeadersOfRows();
    setHeadersOfColumns();
    setHeadersOnTable();
}

function setHeadersOfRows()
{
    let sum = 0;
    let row = [];

    for (let i = 0; i < valuesOfRows.length; i++)
    {
        sum = 0;
        for (let j = 0; j < valuesOfRows[i].length; j++)
        {
            if (valuesOfRows[i][j] === 1)
            {
                sum++;
                if (valuesOfRows[i].length === (j + 1))
                {
                    row.push(sum);
                }
            }
            else if (valuesOfRows[i][j] === 0 && sum > 0)
            {
                row.push(sum);
                sum = 0;
            }
            else
            {
                sum = 0;
            }
        }
        headersOfRows.push(row);
        row = [];
    }
}

function setHeadersOfColumns()
{
    let valuesOfColumns = [];

    for (let i = 0; i < valuesOfRows.length; i++)
    {
        for (let j = 0; j < valuesOfRows[i].length; j++)
        { 
            let arr = [];
            if(i === 0)
            {
                valuesOfColumns.push(arr);
            }
            //console.log(valuesOfRows[j][i]);
            valuesOfColumns[i].push(valuesOfRows[j][i]);
        }
    }

    //console.log(valuesOfColumns);

    let sum = 0;
    let column = [];

    for (let k = 0; k < valuesOfColumns.length; k++)
    {
        sum = 0;
        for (let l = 0; l < valuesOfColumns[k].length; l++)
        {
            if (valuesOfColumns[k][l] === 1)
            {
                sum++;
                if (valuesOfColumns[k].length === (l + 1))
                {
                    column.push(sum);
                }
            }
            else if (valuesOfColumns[k][l] === 0 && sum > 0)
            {
                column.push(sum);
                sum = 0;
            }
            else
            {
                sum = 0;
            }
        }
        headersOfColumns.push(column);
        column = [];
    }

    //console.log(headersOfColumns);
}

function setHeadersOnTable()
{
    let rHeaders = document.getElementsByClassName('rHeader');
    let cHeaders = document.getElementsByClassName('cHeader');

    for (let i = 0; i < headersOfRows.length; i++)
    {
        if (headersOfRows[i].length <= 0)
        {
            rHeaders[i].style.backgroundColor = '#4891ff';
        }
        for (const item of headersOfRows[i]) {
            rHeaders[i].innerHTML += '<p class="headerItem">'+item+'</p>';
        }
        
    }

    for (let j = 0; j < headersOfColumns.length; j++)
    {
        if (headersOfColumns[j].length <= 0)
        {
            cHeaders[j+1].style.backgroundColor = '#4891ff';
        }
        for (const item of headersOfColumns[j]) {
            cHeaders[j+1].innerHTML += '<p class="headerItem">'+item+'</p>';
        }
    }

}

function setClickEventsToFields()
{
    let fields = document.getElementsByClassName('field');

    for (const field of fields) {
        field.onclick = () => {
            checkFieldValue(field);
        }
    }
}

function checkFieldValue(field)
{
    let values = field.children[0].value.split('-');
    if (valuesOfRows[values[0]][values[1]] === 1)
    {
        field.style.backgroundColor = '#48ff7f';
        valuesOfRows[values[0]][values[1]] = 2;
        let anythingLeft = checkFields();
        if (!anythingLeft)
        {
            showWinScreen();
        }
    }
    else if (valuesOfRows[values[0]][values[1]] !== (1 || 2))
    {
        field.style.backgroundColor = '#ff4848';
        amountOfMistakes++;
    }

    checkMistakes();
}

function checkFields()
{
    for (const rowValues of valuesOfRows) {
        for (const value of rowValues) {
            if (value === 1)
            {
                return true;
            }
        }
    }
    return false;
}

function checkMistakes()
{
    if (amountOfMistakes >= 4)
    {
        showLoseScreen();
    }
}

function showLoseScreen()
{
    let loseScreen = document.createElement('div');
    loseScreen.id = 'endScreen';
    loseScreen.style.position = 'absolute';
    loseScreen.style.display = 'flex';
    loseScreen.style.alignItems = 'center';
    loseScreen.style.justifyContent = 'center';
    loseScreen.style.top = 0;
    loseScreen.style.left = 0;
    loseScreen.style.width = 100 + '%';
    loseScreen.style.height = 100 + '%';
    loseScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    loseScreen.style.zIndex = 2;

    let text = document.createElement('p');
    text.innerHTML = 'You lost the game! (Wait 5 sec!) <:C';
    text.style.padding = '50px 150px';
    text.style.borderRadius = '20px';
    text.style.color = '#1a1a1a';
    text.style.fontWeight = 'bold';
    text.style.backgroundColor = '#fff';

    loseScreen.appendChild(text);

    document.body.children[1].appendChild(loseScreen);

    setTimeout(() => {
        clearEndScreens();
        selectedType(recentType);
    }, 5000);
}

function showWinScreen()
{
    let loseScreen = document.createElement('div');
    loseScreen.id = 'endScreen';
    loseScreen.style.position = 'absolute';
    loseScreen.style.display = 'flex';
    loseScreen.style.alignItems = 'center';
    loseScreen.style.justifyContent = 'center';
    loseScreen.style.top = 0;
    loseScreen.style.left = 0;
    loseScreen.style.width = 100 + '%';
    loseScreen.style.height = 100 + '%';
    loseScreen.style.backgroundColor = 'rgba(9, 255, 0, 0.5)';
    loseScreen.style.zIndex = 2;

    let text = document.createElement('p');
    text.innerHTML = 'Congratulation! You won! (Wait 5 sec!) (^-^)';
    text.style.padding = '50px 150px';
    text.style.fontWeight = 'bold';
    text.style.color = '#1a1a1a';
    text.style.borderRadius = '20px';
    text.style.backgroundColor = '#fff';

    loseScreen.appendChild(text);

    document.body.children[1].appendChild(loseScreen);

    setTimeout(() => {
        clearEndScreens();
        selectedType(recentType);
    }, 5000);
}

function clearEndScreens()
{
    document.getElementById('endScreen').remove();
}

function clearTable()
{
    document.getElementById('table').innerHTML = '';
}

function clearValues()
{
    valuesOfRows = [];
    headersOfColumns = [];
    headersOfRows = [];
}

