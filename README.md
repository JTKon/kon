# kon

안녕하세요. kon씨 입니다.

https://github.com/JTKon/kon 은 kon씨의 site인 devpage.net을 구축하기 위해서 만들어진 소스 저장소입니다.

현재 구축중이며, 현재까지의 진행상황은 아래와 같네요.


devpage.net 도메인 구입

aws ec2 생성

개발 ide 구축 (eclipse che)

build-deploy 구축(jenkins)


devpage.net은 현재 아래와 같이 구축 되어 있습니다.

devpage.net:80 -> haproxy -> node.js : api-gateway 역할을 하고 있습니다.

static.devpage.net:80 -> haproxy -> nginx : css, img, js등 static자원을 배포하고 있습니다.

blog.devpage.net:80 -> haproxy -> node.js -> spring-boot : devpage.net을 위한 blog운영을 구축 하고 있습니다.


추후 진행 예정

auth.devpage.net을 node.js로 개발하여 인증 시스템이 구축

blog.devpage.net의 CRUD을 구현 할 예정입니다.(인증된 인원에 한해 CUD가능)

소스는 도메인별 디렉토리로 구분되어 https://github.com/JTKon/kon에서 보실 수 있습니다.


감사합니다.