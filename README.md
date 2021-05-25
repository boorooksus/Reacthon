# React-Python-Compiler

### React와 Node.js 를 이용한 파이썬 코드 실행 웹 어플리케이션



### 프로젝트 동기 및 목표

<p> 
React, Node.js와 Python 간의 데이터를 주고받는 방법을 학습하고 이를 적용하여, 웹에서 파이썬 코드를 입력 받아 실행 결과를 출력하는 프로그램을 만든다. 이전 프로젝트인 'python 코드를 실행 웹 어플리케이션'(https://github.com/boorooksus/Python-Running-Web-App.git)에 React 기능을 추가한 프로젝트이다. </p>

</p>

<br>



#### 프로젝트 설치 및 실행 방법

1. 소스코드 zip파일 다운로드 및 압축 풀기
2. CMD창에서 압축 해제한 프로젝트 디렉토리로 이동
3. CMD창에 'npm install' 명령어 입력하여 모듈 설치
4. CMD창에서 'cd client' 명령어 입력하여 클라이언트 디렉토리로 이동
5. CMD창에 'npm install' 명령어 입력하여 모듈 설치
6. CMD창에 'cd ../' 명령어 입력하여 프로젝트 루트 디렉토리로 이동
7. CMD창에서 'npm run dev' 명령어 입력
8. 웹브라우져에서 'http://localhost:3000' 으로 이동

<br>

### 프로젝트 설명

프론트엔드 측에서 코드를 입력 받고 서버로 전송하면, 서버 측에서는 'python-shell' npm을 이용하여 전송 받은 파이썬 코드를 실행 후, 실행 결과를 다시 프론트엔드로 보내어 결과를 출력한다. 
백엔드 부분은 이전에 만든'python 코드를 실행 웹 어플리케이션'(https://github.com/boorooksus/Python-Running-Web-App.git)의 코드를 이용하였고, 프론트 엔드 부분에는 React를 추가하여 만들었다.

- 실행 영상
  ![new2_hi](https://user-images.githubusercontent.com/55964775/112476286-16707d80-8db5-11eb-800f-23156944bb9b.gif)

  <br>

![new2_별찍기](https://user-images.githubusercontent.com/55964775/112476288-17091400-8db5-11eb-8e2c-6d49f26e964a.gif)
<br>

- 에러가 있을 때
  ![new2_오류](https://user-images.githubusercontent.com/55964775/112476291-17a1aa80-8db5-11eb-9369-5085d35ccb9e.gif)

  결과창에 에러 메시지가 출력된다.

  <br>

- 한글 출력
  ![new2_안녕하세요](https://user-images.githubusercontent.com/55964775/112476290-17091400-8db5-11eb-9e32-585f2a796807.gif)

  한글이 깨지지 않고 출력된다.

  <br>

- numpy와 다층신경망을 이용한 XOR 구현 코드 실행

![new2_xor](https://user-images.githubusercontent.com/55964775/112476358-27b98a00-8db5-11eb-8d51-dd37d0a3dfa5.gif)

서버 측에서 numpy등의 파이썬 외부 모듈을 설치하면 머신 러닝을 위한 코드 실행이 가능하다.

<br>

### 평가

React를 이용하여 프로그램을 컴포넌트 단위로 나누고 관리하는 법을 배우게 되었다. 그리고 이전 프로젝트에서 아쉬웠던 부분을 개선하여 만족스러웠다. 이전에는 파이썬 코드를 작성하고 제출 버튼을 누르면 결과 페이지로 이동해야 했지만, 이번 어플리케이션에서는 페이지를 이동하지 않고 결과를 출력하도록 하였다. 

