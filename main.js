// 컨텐츠 로드 및 렌더링
fetch('resume.md')
  .then(response => response.text())
  .then(text => {
    const contentElement = document.getElementById('content');
    const htmlContent = marked.parse(text);
    contentElement.innerHTML = htmlContent;

    // 섹션에 id 추가 (네비게이션과 스크롤 연동)
    const headings = contentElement.querySelectorAll('h2');
    headings.forEach(heading => {
      const id = heading.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
      heading.id = id;
    });

    // 프로젝트 섹션의 버튼 추가
    const projectSection = document.getElementById('projects');
    if (projectSection) {
      const demoLinks = projectSection.querySelectorAll('a[href*="github.io"]');
      demoLinks.forEach(link => {
        const button = document.createElement('a');
        button.href = link.href;
        button.textContent = 'View Demo';
        button.className = 'btn btn-primary mt-2';
        link.parentNode.replaceChild(button, link);
      });
    }
  });
