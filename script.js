window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyObJNgAOusW-GSiiGCkaMdXck1rlHGJS8p8hVV0WZKsc9tThXXzf6Mso2joGQgdWPa/exec';
    const form = document.forms['contact-form'];

    if (!form) {
        console.error('Form not found');
        return;
    }

    form.addEventListener('submit', e => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Hiển thị trạng thái gửi
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = "Đang gửi...";
        submitButton.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                if (response.ok) {
                    alert("Gửi thành công. Cảm ơn bạn vì đã lựa chọn SmartPath!");
                    form.reset(); // Reset form về trạng thái ban đầu
                } else {    
                    alert("Ôi có lỗi mất rồi :( Hãy gửi lại nhé.");
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("Lỗi gửi đơn. Vui lòng kiểm tra lại kết nối Internet.");
            })
            .finally(() => {
                submitButton.textContent = "Submit";
                submitButton.disabled = false;
            });
    });
});
