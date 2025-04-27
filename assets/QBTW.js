function updateStatus(e) {
    if (e.getModifierState) {
        document.getElementById('capsStatus').textContent = 
            e.getModifierState('CapsLock') ? 'C' : ' ';
        document.getElementById('numStatus').textContent = 
            e.getModifierState('NumLock') ? 'N' : ' ';
    }
}
function getScrollPercentage() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = Math.max(
      document.body.scrollHeight, 
      document.documentElement.scrollHeight
    );
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (documentHeight <= windowHeight) {
      return 0; 
    }
    const scrollableHeight = documentHeight - windowHeight;
    const percentage = (scrollPosition / scrollableHeight) * 100;
    return Math.min(100, Math.max(0, Math.round(percentage)));
}
document.addEventListener('DOMContentLoaded', function() {
    const scrollbars = document.querySelectorAll('[data="scrollbar"]');
    const lineCount = scrollbars.length ; 
    window.addEventListener('scroll', function() {
        const ScrollPercentage = getScrollPercentage();
        let targetLineIndex = Math.round((lineCount-1) * (ScrollPercentage / 100));
        for (let i = 0; i < lineCount; i++) {
            line = scrollbars[i];
            if (i == targetLineIndex) {
                line.classList.add('blackspace');
                line.classList.remove('dialog');
            } else {
                line.classList.add('dialog');
                line.classList.remove('blackspace');
            }
        }
    });
    if (scrollbars.length > 0) {
        scrollbars[0].classList.add('blackspace');
        scrollbars[0].classList.remove('dialog');
    }

    
    document.addEventListener('keydown', updateStatus);
    document.addEventListener('keyup', updateStatus);

    const links = document.querySelectorAll('a');
    if(links.length>0){links[0].focus()}

    const btnContainer = document.createElement('div');
    btnContainer.style.textAlign = 'center';
    btnContainer.style.margin = '20px 0';
    
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'fontToggleBtn';
    toggleBtn.tabIndex = -1;
    toggleBtn.textContent = '< 字型由 PCDOS 切換至 ET3 >';
    btnContainer.appendChild(toggleBtn);
    document.getElementsByClassName('container')[0].appendChild(btnContainer);
    const body = document.body;
    const savedFont = localStorage.getItem('preferredFont');
    if (savedFont === 'alt') {
        body.classList.add('font-alt');
        toggleBtn.textContent = '< 字型由 ET3 切換至 PCDOS >';
    }
    function toggleFont() {
        body.classList.toggle('font-alt');
        
        if (body.classList.contains('font-alt')) {
            localStorage.setItem('preferredFont', 'alt');
            toggleBtn.textContent = '< 字型由 ET3 切換至 PCDOS >';
        } else {
            localStorage.setItem('preferredFont', 'original');
            toggleBtn.textContent = '< 字型由 PCDOS 切換至 ET3 >';
        }
    }
    toggleBtn.addEventListener('click', toggleFont);
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key.toLowerCase() === 'f') {
            toggleFont();
        }
    });








});
  