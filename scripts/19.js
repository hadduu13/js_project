document.addEventListener('DOMContentLoaded', () => {
    const boxs = document.querySelectorAll('.box');
    const bt1 = document.querySelector('#bt1');

    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 1]; //초기배열
    let flag = true; //클릭확인
    let cnt = 0; //하트 개수
    let selarr = []; //눌러진 순서

    //폭탄섞기 버튼
    bt1.addEventListener('click', () => {
        if (flag) {
            arr.sort(() => Math.random() - 0.5);
            console.log(arr);
            flag = false;
            cnt = 0;
            selarr = [];
            document.querySelector('h2').innerHTML = '';
            for (let box of boxs) {
                box.innerHTML = box.getAttribute('id').slice(-1);
            }
        }
    });

    // //div박스 제어
    for (let box of boxs) {
        //박스번호 넣기
        box.innerHTML = box.getAttribute('id').slice(-1); //get.Attribute는 속성을 가지고 올 수 있음


        // 박스 클릭이벤트 처리
        box.addEventListener('click', () => {
            let n = parseInt(box.textContent);

            //기존에 하트나 폭탄이 들어있는 경우
            if (isNaN(n)) return;

            //폭탄이 눌러지지 않는 경우
            if (!flag) {
                //선택항목 추가
                selarr.push(n);
                console.log('n=', n, 'selarr=' , selarr);
                cnt++;
                console.log("cnt=", cnt)
            

            //폭탄, 하트 구분
            if (arr[n - 1] == 0) {
                //하트
                box.innerHTML = '<img src="./img2/hart.png">'
                if(cnt == 8){
                    flag = true;
                document.querySelector('h2').innerHTML = '성공!!!'

                let lastArr = [1,2,3,4,5,6,7,8,9].filter((item) => !selarr.includes(item))  //차집합을 이용하여 1찾아내기
                boxs[lastArr[0]-1].innerHTML = '<img src="./img2/boom.png">'
                }

            }
            else {
                //폭탄
                box.innerHTML = '<img src="./img2/boom.png">'
                flag = true;
                document.querySelector('h2').innerHTML = '실패!!!'
            }
        }
        
        });
        }
    });



//폭탄섞기 누르면 배열이 랜덤으로 섞이게 만들기
//div에 click event넣기
//게임이 시작되면 끝날때까지 폭탄섞기를 더이상 누르지 못하게 만들기
//0이면 하트, 1이면 폭탄F