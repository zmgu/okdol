// 패턴
const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,32}$/;
const namePattern = /^[a-zA-Z가-힣]*$/;
const birthPattern = /^[0-9-]*$/;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('idAlert').style.display = 'none';
    document.getElementById('pwAlert').style.display = 'none';
    document.getElementById('pwConfirmAlert').style.display = 'none';
    document.getElementById('nameAlert').style.display = 'none';
    document.getElementById('birthAlert').style.display = 'none';
});

// 아이디
document.getElementById('userid').addEventListener('blur', function () {

    var idValue = this.value,
        idAlert = document.getElementById('idAlert'),
        userid = document.getElementById('userid');

    if  (!idValue) {
        idAlert.style.display = 'block';
        idAlert.classList.add('alert-danger');
        idAlert.textContent = '이메일을 입력해 주세요.';
        userid.classList.add('is-invalid');

    } else if (!emailPattern.test(idValue)) {
        idAlert.style.display = 'block';
        idAlert.classList.add('alert-danger');
        idAlert.textContent = '이메일 형식에 맞지 않습니다.';
        userid.classList.add('is-invalid');

    } else {
        idAlert.style.display = 'none';
        userid.classList.remove('is-invalid');
        userid.classList.add('is-valid');
    }
});

// 비밀번호 
document.getElementById('pw').addEventListener('input', function () {

    var pwValue = this.value,
        pwAlert = document.getElementById('pwAlert'),
        pw = document.getElementById('pw'),
        pwConfirm = document.getElementById('pwConfirm'),
        pwConfirmAlert = document.getElementById('pwConfirmAlert');

    if (!pwValue) {
        pwAlert.style.display = 'block';
        pwAlert.classList.add('alert-danger');
        pwAlert.textContent = '비밀번호를 입력해 주세요.';
        pw.classList.add('is-invalid');

    } else if (!pwPattern.test(pwValue)) {
        pwAlert.style.display = 'block';
        pwAlert.classList.add('alert-danger');
        pwAlert.textContent = '비밀번호는 8~16자의 숫자, 영문, 특수문자를 조합하여 사용해 주세요.';
        pw.classList.add('is-invalid');

        // 패턴이 일치하지 않으면 바로 pwConfirm의 유효성 검사를 중지
        pwConfirmAlert.style.display = 'block';
        pwConfirmAlert.classList.add('alert-danger');
        pwConfirmAlert.textContent = '비밀번호가 일치하지 않습니다.';
        pwConfirm.classList.add('is-invalid');

        return;
    }

    pwAlert.style.display = 'none';
    pw.classList.remove('is-invalid');
    pw.classList.add('is-valid');

    // pwConfirm의 현재 값도 검사
    validatePwConfirm();
});

document.getElementById('pwConfirm').addEventListener('input', validatePwConfirm);

function validatePwConfirm() {

    var pwConfirm = document.getElementById('pwConfirm'),
        pw = document.getElementById('pw'),
        pwConfirmAlert = document.getElementById('pwConfirmAlert');

    if(pw.value == pwConfirm.value && pwPattern.test(pwConfirm.value)) {
        pwConfirmAlert.style.display = 'none';
        pwConfirm.classList.remove('is-invalid');
        pwConfirm.classList.add('is-valid');

    } else if(!pwConfirm.value) { 
        pwConfirmAlert.style.display = 'none';
        pwConfirm.classList.add('is-invalid');

    } else {
        pwConfirmAlert.style.display = 'block';
        pwConfirmAlert.classList.add('alert-danger');
        pwConfirmAlert.textContent = '비밀번호가 일치하지 않습니다.';
        pwConfirm.classList.add('is-invalid');
    }
}

// 이름
document.getElementById('username').addEventListener('blur', function () {

    var nameValue = this.value,
        nameAlert = document.getElementById('nameAlert'),
        username = document.getElementById('username');

    if (!nameValue) {
        nameAlert.style.display = 'block';
        nameAlert.classList.add('alert-danger');
        nameAlert.textContent = '이름을 입력해 주세요.';
        username.classList.add('is-invalid');

    } else if (!namePattern.test(nameValue)) {
        nameAlert.style.display = 'block';
        nameAlert.classList.add('alert-danger');
        nameAlert.textContent = '한글, 영문 대/소문자를 사용해 주세요.';
        username.classList.add('is-invalid');

    } else {
        nameAlert.style.display = 'none';
        username.classList.remove('is-invalid');
        username.classList.add('is-valid');
    }
});

// 생년월일
document.getElementById('birth').addEventListener('blur', function () {

    var birthValue = this.value,
        birth = document.getElementById('birth'),
        birthAlert = document.getElementById('birthAlert');

    const numericValue = birthValue.replace(/\D/g, '');

    if (!birthValue) {
        birthAlert.style.display = 'block';
        birthAlert.classList.add('alert-danger');
        birthAlert.textContent = '생년월일을 입력해 주세요.';
        birth.classList.add('is-invalid');

    } else if (!birthPattern.test(birthValue) || numericValue.length != 8) {
        birthAlert.style.display = 'block';
        birthAlert.classList.add('alert-danger');
        birthAlert.textContent = '생년월일 8자리 숫자로 입력해 주세요.';
        birth.classList.add('is-invalid');

    } else {
        var y = parseInt(numericValue.slice(0, 4), 10),
            m = parseInt(numericValue.slice(4, 6), 10),
            d = parseInt(numericValue.slice(6), 10);

        const currentYear = new Date().getFullYear(),
              dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
        
        if (dateRegex.test(d+'-'+m+'-'+y) && y >= currentYear - 100 && y <= currentYear - 7) {

            y = String(y);
            m = String(m);
            if (m.length < 2) { m = '0' + m }
            d = String(d);
            if (d.length < 2) { d = '0' + d }

            this.value = y+'-'+m+'-'+d;
            birthAlert.style.display = 'none';
            birth.classList.remove('is-invalid');
            birth.classList.add('is-valid');

        } else {
            birthAlert.style.display = 'block';
            birthAlert.classList.add('alert-danger');
            birthAlert.textContent = '생년월일이 정확한지 확인해 주세요.';
            birth.classList.add('is-invalid');
        }
    }
});

