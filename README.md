# Devpage.net

안녕하세요. kon씨 입니다.

https://github.com/JTKon/kon 은 kon씨의 site인 devpage.net을 구축하기 위해서 만들어진 소스 저장소입니다.

현재 구축중이며, 현재까지의 진행상황은 아래와 같네요.

* devpage.net 도메인 구입
* aws ec2 생성
* 개발 ide 구축 (eclipse che)
* build-deploy 구축(jenkins)

devpage.net은 현재 아래와 같이 구축 되어 있습니다.

* devpage.net -> haproxy:80 -> 127.0.0.1:7000(node.js) : api-gateway 역할
* static.devpage.net -> haproxy:80 -> 127.0.0.1:7050(nginx) : css, img, js등 static자원을 배포
* blog.devpage.net -> haproxy:80 -> api-gateway -> 127.0.0.1:7030(spring-boot) : devpage.net을 위한 blog
* auth.devpage.net -> haproxy:80 -> api-gateway -> 127.0.0.1:7010(nojd.js) : 인증서버

추후 진행 예정

* blog.devpage.net의 CRUD을 구현 할 예정입니다.(인증된 인원에 한해 CUD가능)

소스는 도메인별 디렉토리로 구분되어 https://github.com/JTKon/kon 에서 보실 수 있습니다.

현재까지 구성된 아키텍쳐는 http://static.devpage.net/archi.html 에 간략하게 그려 두었습니다.

감사합니다.