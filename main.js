/* FUNCTION */
function WebAlert() {
    alert('Selamat datang di Calorify! Virtual Lab Favorit Anda');
    const body = document.querySelector('body');
    body.removeAttribute('hidden');
}

let caloriesCount = 0;

function hitungKalori() {
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const intensitas = document.querySelector('input[name="intensitas"]:checked')?.value;
    const beratBadan = parseFloat(document.getElementById('inputBeratBadan').value);
    const tinggiBadan = parseFloat(document.getElementById('inputTinggiBadan').value);
    const umur = parseInt(document.getElementById('inputUmur').value);

    let BMR;
    if (gender === 'laki'){
        BMR= 66.5+(13.7*beratBadan)+(5*tinggiBadan)-(6.8*umur);
    } 
    else if (gender === 'perempuan'){
        BMR = 655+(9.6*beratBadan)+(1.8*tinggiBadan)-(4.7*umur);
    }
    else{
        console.error('Anda tidak input gender !');
        return;
    }

    let kalori;
    if (intensitas === 'tidakPernah'){
        kalori = BMR * 1.2;
    } 
    else if (intensitas === 'Jarang'){
        kalori = BMR * 1.3;
    }
    else if (intensitas === 'Sering'){
        kalori = BMR * 1.4;
    }
    else{
        console.error('Anda tidak input intensitas latihan fisik !');
        return;
    }

    sessionStorage.setItem('Kalori',kalori);

    const outputCalory = document.getElementById('outputKalori');
    outputCalory.textContent = `${kalori.toFixed(2)} kkal/hari`; 
}

function statusKebutuhanKalori(caloriesCount) {
    const kebutuhanKalori = parseFloat(sessionStorage.getItem('Kalori'));
    const ubahState = document.getElementById('ubahState');
    console.log(kebutuhanKalori);
    console.log(ubahState);
    console.log(caloriesCount);

    if (caloriesCount > kebutuhanKalori) {
        ubahState.textContent = `Kebutuhan kalorimu telah melebihi target!`;
    } 
    else if (caloriesCount === kebutuhanKalori) {
        ubahState.textContent = `Kebutuhan kalorimu telah terpenuhi!`;
    } 
    else {
        ubahState.textContent = `Kebutuhan kalorimu masih belum terpenuhi!`;
    }
}

function unduhUlangData() {
    sessionStorage.clear();
    caloriesCount = 0;
    document.getElementById('outputKalori').textContent = '0 kkal/hari'; 
    document.getElementById('outputStomach').textContent = '0 kkal';
    document.getElementById('ubahState').textContent = 'kebutuhan kalorimu belum diketahui !';
    document.getElementById('inputData').reset();
}
/* EVENTS */
document.addEventListener('DOMContentLoaded', function () {
    WebAlert();

    const foods = document.querySelectorAll('.foody');
    const human = document.getElementsByClassName('manusia')[0];

    if (foods){
        foods.forEach(item => {
            item.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text/plain', item.dataset.calories);
                event.dataTransfer.effectAllowed = 'move';
            });
        });
    }

    if (human){
        human.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
        
        human.addEventListener('drop', (event) => {
            event.preventDefault();
            const calory = event.dataTransfer.getData('text/plain');
            if (calory) {
                caloriesCount += parseInt(calory);
                alert(`Kamu barusan makan sebanyak ${calory} kkal! Total kalori hari ini ${caloriesCount} kkal`);
                const outputStomach = document.getElementById('outputStomach');
                outputStomach.textContent = `${caloriesCount.toFixed(2)} kkal`; 
                statusKebutuhanKalori(caloriesCount);
            }
        
        });
    }
});

document.getElementById('inputData').addEventListener('submit', function(event) {
    event.preventDefault();

    const gender = document.querySelector('input[name="gender"]:checked');
    const intensitas = document.querySelector('input[name="intensitas"]:checked');
    const beratBadan = document.getElementById('inputBeratBadan').value;
    const tinggiBadan = document.getElementById('inputTinggiBadan').value;
    const umur = document.getElementById('inputUmur').value;

    sessionStorage.setItem('gender', gender ? gender.value : null);
    sessionStorage.setItem('intensitas', intensitas ? intensitas.value : null);
    sessionStorage.setItem('beratBadan', beratBadan);
    sessionStorage.setItem('tinggiBadan', tinggiBadan);
    sessionStorage.setItem('umur', umur);

    alert("Data berhasil disimpan!");
    hitungKalori();
});

document.getElementById('resetTombol').addEventListener('click', unduhUlangData);