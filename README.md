# Devpage.net
안녕하세요. kon 입니다.

https://github.com/JTKon/kon 은 kon씨의 site인 http://devpage.net을 구축하기 위해서 만들어진 소스 저장소입니다.

현재 구축중이며, 현재까지의 진행상황은 아래와 같네요.

* devpage.net 도메인 구입
* aws ec2 생성
* 개발 ide 구축 (eclipse che)
* build-deploy 구축(jenkins)
* blog 개발

devpage.net은 현재 아래와 같이 구축 되어 있습니다.

* devpage.net -> haproxy:80 -> 127.0.0.1:7000(node.js) : api-gateway 역할
* static.devpage.net -> haproxy:80 -> 127.0.0.1:7050(nginx) : css, img, js등 static자원을 배포
* blog.devpage.net -> haproxy:80 -> api-gateway -> 127.0.0.1:7030(spring-boot) : devpage.net을 위한 blog
* auth.devpage.net -> haproxy:80 -> api-gateway -> 127.0.0.1:7010(nojd.js) : 인증서버

추후 진행 예정

* blog.devpage.net의 기본적인 CRUD가 구현되었습니다.(2016.12.27)
* 현재까지의 진행상황을 blog에 써보면서, blog의 미진한 부분을 업데이트 하려고 합니다.

소스는 도메인별 디렉토리로 구분되어 https://github.com/JTKon/kon 에서 보실 수 있습니다.

현재까지 구성된 아키텍쳐는 아래 주소에 간략하게 그려 두었습니다.

http://static.devpage.net/archi.html

감사합니다.