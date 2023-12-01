// 패턴
const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,32}$/;

document.addEventListener('DOMContentLoaded', function () {
    var idCheck = document.getElementById('idCheck');
    var pwCheck = document.getElementById('pwCheck');
    var pwConfirm = document.getElementById('pwConfirm');
    var pwConfirmCheck = document.getElementById('pwConfirmCheck');

    idCheck.style.display = 'none';
    pwCheck.style.display = 'none';
    pwConfirmCheck.style.display = 'none';
});

document.getElementById('userid').addEventListener('input', function () {
    var id = this.value;
    var idCheck = document.getElementById('idCheck');
    var userId = document.getElementById('userid');

    if (emailPattern.test(id) == false) {
        idCheck.style.display = 'block';
        idCheck.classList.add('alert-danger');
        idCheck.textContent = '이메일 형식에 맞지 않습니다.';
        userId.classList.add('is-invalid');
    } else {
        idCheck.style.display = 'none';
        userId.classList.remove('is-invalid');
        userId.classList.add('is-valid');
    }
});

document.getElementById('pw').addEventListener('input', function () {
    var pw = this.value;
    var pwCheck = document.getElementById('pwCheck');
    var pwElement = document.getElementById('pw');
    var pwConfirm = document.getElementById('pwConfirm');
    var pwConfirmCheck = document.getElementById('pwConfirmCheck');

    if (pwPattern.test(pw) == false) {
        pwCheck.style.display = 'block';
        pwCheck.classList.add('alert-danger');
        pwCheck.textContent = '비밀번호는 숫자, 영문, 특수기호를 조합한 8자 이상이어야 합니다.';
        pwElement.classList.add('is-invalid');

        // 패턴이 일치하지 않으면 바로 pwConfirm의 유효성 검사를 중지
        pwConfirmCheck.style.display = 'block';
        pwConfirmCheck.classList.add('alert-danger');
        pwConfirmCheck.textContent = '비밀번호가 일치하지 않습니다.';
        pwConfirm.classList.add('is-invalid');

        return;
    }

    pwCheck.style.display = 'none';
    pwElement.classList.remove('is-invalid');
    pwElement.classList.add('is-valid');

    // pwConfirm의 현재 값도 검사
    validatePwConfirm();
});

document.getElementById('pwConfirm').addEventListener('input', validatePwConfirm);

function validatePwConfirm() {
    var pwConfirm = document.getElementById('pwConfirm');
    var pwElement = document.getElementById('pw');
    var pwConfirmCheck = document.getElementById('pwConfirmCheck');

    if(pwElement.value == pwConfirm.value && pwPattern.test(pwConfirm.value) == true) {
        pwConfirmCheck.style.display = 'none';
        pwConfirm.classList.remove('is-invalid');
        pwConfirm.classList.add('is-valid');
    } else if(pwConfirm.value < 1) { 
        pwConfirmCheck.classList.add('alert-danger');
        pwConfirmCheck.textContent = '비밀번호를 입력해주세요.';
        pwConfirm.classList.add('is-invalid');
    } else {
        pwConfirmCheck.style.display = 'block';
        pwConfirmCheck.classList.add('alert-danger');
        pwConfirmCheck.textContent = '비밀번호가 일치하지 않습니다.';
        pwConfirm.classList.add('is-invalid');
    }
}
