// 패턴
const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/,
      passwordPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,32}$/,
      namePattern = /^[a-zA-Z가-힣]*$/,
      birthAndTelPattern = /^[0-9-]*$/,
      datePattern = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;

// 로딩시 경고 메세지 숨기기
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('idAlert').style.display = 'none';
    document.getElementById('passwordAlert').style.display = 'none';
    document.getElementById('passwordConfirmAlert').style.display = 'none';
    document.getElementById('nameAlert').style.display = 'none';
    document.getElementById('birthAlert').style.display = 'none';
    document.getElementById('phoneNoAlert').style.display = 'none';
});

function declaration(tag) {
    let arr = [document.getElementById(tag), document.getElementById(tag + 'Alert')];

    return arr;
}

// 실패 함수
function fail(tag, message) {

    let elements = declaration(tag);

    elements[1].style.display = 'block';
    elements[1].classList.add('alert-danger');
    elements[1].textContent = message;
    elements[0].classList.add('is-invalid');

}

// 성공 함수
function success(tag) {

    let elements = declaration(tag);
    
    elements[1].style.display = 'none';
    elements[0].classList.remove('is-invalid');
    elements[0].classList.add('is-valid');
}

document.getElementById('id').addEventListener('blur', function () {

    if  (!this.value) {
        fail('id' ,'이메일을 입력해 주세요.');

    } else if (!emailPattern.test(this.value)) {
        fail('id', '이메일 형식에 맞지 않습니다.');

    } else {
        success('id');
    }
});

// 비밀번호 
document.getElementById('password').addEventListener('input', function () {

    if (!passwordPattern.test(this.value)) {
        fail('password', '비밀번호는 8~16자의 숫자, 영문, 특수문자를 조합하여 사용해 주세요.')

    } else {
        success('password');
        validatePasswordConfirm();
    }
});

document.getElementById('password').addEventListener('blur', function () {

    if (!this.value) {
        fail('password', '비밀번호를 입력해 주세요.');
    }
});

document.getElementById('passwordConfirm').addEventListener('input', validatePasswordConfirm);

function validatePasswordConfirm() {

    let password = document.getElementById('password'),
        passwordConfirm = declaration('passwordConfirm');

    if(password.value == passwordConfirm[0].value && passwordPattern.test(passwordConfirm[0].value)) {
        success('passwordConfirm');

    } else if(!passwordConfirm[0].value) { 
        passwordConfirm[1].style.display = 'none';
        passwordConfirm[1].classList.add('is-invalid');

    } else {
        fail('passwordConfirm', '비밀번호가 일치하지 않습니다.');
    }
}

document.getElementById('passwordConfirm').addEventListener('blur', function () {

    if (!this.value) {
        fail('passwordConfirm', '비밀번호 재확인을 입력해 주세요.');
    }
});

// 이름
document.getElementById('name').addEventListener('blur', function () {

    if  (!this.value) {
        fail('name' ,'이름을 입력해 주세요.');

    } else if (!namePattern.test(this.value)) {
        fail('name', '한글, 영문 대/소문자를 사용해 주세요.');

    } else {
        success('name');
    }
});

// 생년월일
document.getElementById('birth').addEventListener('blur', function () {

    let birthValue = this.value;

    const numberValue = birthValue.replace(/\D/g, '');

    if (!birthValue) {
        fail('birth', '생년월일을 입력해 주세요.');

    } else if (!birthAndTelPattern.test(birthValue) || numberValue.length != 8) {
        fail('birth', '생년월일 8자리 숫자로 입력해 주세요.');

    } else {
        let year = numberValue.slice(0, 4),
            month = numberValue.slice(4, 6),
            date = numberValue.slice(6);

        const currentYear = new Date().getFullYear();
        
        if (datePattern.test(date + '-' + month + '-' + year) && year >= currentYear - 100 && year <= currentYear - 7) {
            this.value = year + '-' + month + '-' + date;
            success('birth');

        } else {
            fail('birth', '생년월일이 정확한지 확인해 주세요.');
        }
    }
});

// 휴대폰 번호
document.getElementById('phoneNo').addEventListener('blur', function () {

    let phoneNoValue = this.value;

    const numberValue = phoneNoValue.replace(/\D/g, '');

    if (!phoneNoValue) {
        fail('phoneNo', '휴대전화번호를 입력해 주세요.');

    } else if (!birthAndTelPattern.test(phoneNoValue) || numberValue.length != 11) {
        fail('phoneNo', '휴대전화번호 11자리 숫자로 입력해 주세요.');

    } else {
        let firstNo = numberValue.slice(0, 3),
            middleNo = numberValue.slice(3, 7),
            lastNo = numberValue.slice(7);

        const phoneNoRegex = /^01(0|1|6|7|8|9)$/;

        if (phoneNoRegex.test(firstNo)) {

            this.value = firstNo + '-' + middleNo +'-'+ lastNo;
            success('phoneNo');

        } else {
            fail('phoneNo', '휴대전화번호가 정확한지 확인해 주세요.');
        }
    }
});

// 버튼
function validateForm() {
    let id = declaration('id'),
        password = declaration('password'),
        passwordConfirm = declaration('passwordConfirm'),
        name = declaration('name'),
        birth = declaration('birth'),
        phoneNo = declaration('phoneNo');

        // 컨트롤러로 보내기
        if (id[0].classList.contains('is-valid') &&
            password[0].classList.contains('is-valid') &&
            passwordConfirm[0].classList.contains('is-valid') &&
            name[0].classList.contains('is-valid') &&
            birth[0].classList.contains('is-valid') &&
            phoneNo[0].classList.contains('is-valid')) {

                alert('성공');
            return;

        } else {
            if (!id[0].value) {
                fail('id', '이메일을 입력해 주세요.');
            } else if (id[1].style.display === 'block') {
                id[0].focus();
            } else if (!password[0].value) {
                fail('password', '비밀번호를 입력해 주세요.');
            } else if (password[1].style.display === 'block') {
                password[0].focus();
            } else if (!passwordConfirm[0].value) {
                fail('passwordConfirm', '비밀번호 재확인을 입력해 주세요.');
            } else if (passwordConfirm[1].style.display === 'block') {
                passwordConfirm[0].focus();
            } else if (!name[0].value) {
                fail('name', '이름을 입력해 주세요.');
            } else if (name[1].style.display === 'block') {
                name[0].focus();
            } else if (!birth[0].value) {
                fail('birth', '생년월일을 입력해 주세요.');
            } else if (birth[1].style.display === 'block') {
                birth[0].focus();
            } else if (!phoneNo[0].value) {
                fail('phoneNo', '휴대전화번호를 입력해 주세요.');
            } else if (phoneNo[1].style.display === 'block') {
                phoneNo[0].focus();
            }
            return false;
        }
}
