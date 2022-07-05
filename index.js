// Import stylesheets
import './style.css';
import liff from '@line/liff';
import $ from 'jquery';

// Initialize LIFF
liff
  .init({ liffId: '1656421021-qlMrjlvQ' })
  .then(() => {
    runApp();
  })
  .catch((err) => {
    console.error(err.code, error.message);
  });

// runApp();
function runApp() {
  // Listen for form submit
  let form = document.getElementById('carForm');
  form.addEventListener('submit', submitForm);

  // Function form submit
  function submitForm(e) {
    let newxx = document.getElementById('xxd').value;
    let nameu = document.getElementById('name').value;
    let naw = document.getElementById('new').value;
    let province = document.getElementById('province').value;

    console.log('dddd');
    //ถ้าอัพไฟล์เปิดกลุ่มนี้
    // Swal.fire({
    //   position: 'center',
    //   icon: 'success',
    //   title: 'บันทึกข้อมูลแล้ว',
    //   showConfirmButton: true,
    //   // timer: 1500,
    // });

    e.preventDefault();
    // เช็คการอัพโหลดว่ามีไฟล์ที่อัพไปหรือไม่;
    // var lengthpic = form.files1.files.length; // ช่วงไฟล์
    // if (lengthpic < 1) {
    //   console.log('ไม่มีรูป');
    // }

    // ถ้าอัพไฟล์เปิดกลุ่มนี้;
    // var size = form.files1.files[0].size;
    // if (size > 2097152) {
    //   return Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     title: 'ภาพขนาดเกินกว่า 4 Mb',
    //     showConfirmButton: true,
    //     timer: 3000,
    //   });
    // }
    loadingStart();

    // const namefile = form.name.value + ' ' + form.xxd.value + ' ' + new Date();
    // ชื่อไฟล์ เปิดถ้าใช้อัพไฟล์เปิดบรรทัดนี้
    // console.log(size);
    // console.log('ชื่อไฟล์ ' + namefile);

    // const file = form.files1.files[0];
    // const fr = new FileReader();
    // fr.readAsArrayBuffer(file);
    // fr.onload = (f) => {
      const url =
        'https://script.google.com/macros/s/AKfycbyCs7krAUrZ_q0mcA8gDD5I9cfgGPQHfy5qrAuVWbU2M3sm7uhVTDurE5t7rTrc8hs5/exec'; // <--- Please set the URL of Web Apps.

      const qs = new URLSearchParams({
        // filename: namefile || file.name,
        // mimeType: file.type,

        xxd: form.xxd.value,
        name: form.name.value,
        class: form.class.value,
        year: form.year.value,
        room: form.room.value,
        major: form.major.value,
        new: form.new.value,
        money: form.money.value,
        house_no: form.house_no.value,
        village_no: form.village_no.value,
        village: form.village.value,
        road: form.road.value,
        district: form.district.value,
        amphoe: form.amphoe.value,
        province: form.province.value,
        zipcode: form.zipcode.value,
        father: form.father.value,
        tel2: form.tel2.value,
        mother: form.mother.value,
        tel3: form.tel3.value,
        selparrent: form.selparrent.value,
        parrent: form.parrent.value,
        tel4: form.tel4.value,
      });

      fetch(`${url}?${qs}`, {
        method: 'POST',
        // body: JSON.stringify([...new Int8Array(f.target.result)]), // ถ้าอัพไฟล์เปิดกลุ่มนี้
        body: JSON.stringify([...new Int8Array()]),
      })
        .then(
          (res) => res.json()
          // document.getElementById('demo1').reset(),
        )
        .then((e) => console.log(e))
        // <--- You can retrieve the returned value here.
        .catch((err) => console.log(err));

      /**
    const scriptURL =
      'https://script.google.com/macros/s/AKfycbze4wU2LyEs3iPlarnS2rx4cmKuRCezwITySZu-QmI0udxs-yI/exec'; //** URL เว็บแอพ
    const form = document.forms['carForm'];
    let newxx = document.getElementById('xxd').value;
    let nameu = document.getElementById('name').value;
    let naw = document.getElementById('new').value;
    let province = document.getElementById('province').value;

    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      //.then(response => alert("บันทึกข้อมูลเรียบร้อย..."))
      .then((response) =>
        // SweetAlert แจ้งเตือนหลังส่งข้อมูลแล้ว ปิดอัตโนมัติ

        // ปิด SweetAler

        // document.getElementById("carForm").reset() //ให้รีเซ็ตฟอร์มหลังจากส่งข้อมูล
        //               .catch(error => console.error('Error!', error.message))
        // e.preventDefault();
        // Get values and set to number type

        // Reset form
        form.reset()
      );

    */

      // Sends messages on behalf of the user to the chat screen where the LIFF app is opened.
      if (
        liff.getContext().type !== 'none' &&
        liff.getContext().type !== 'external'
      ) {
        // Create flex message

        let message = createFlexMessage(newxx, nameu);

        // Send messages
        liff
          .sendMessages(message)
          .then(() => {
            setTimeout(function () {
              loadingEnd();
              alert(
                'ลงทะเบียนเรียบร้อย กรุณาตรวจสอบความถุูกต้องอีกครั้ง ที่ link'
              );
              liff.closeWindow();
            }, 10000);
          })
          .catch((err) => {
            console.error(err.code, error.message);
          });
      } else {
        // Result table in browser
        createResultTable(newxx, nameu, naw);
        loadingEnd();
        alert('บันทึกข้อมูลเรียบร้อย');
        form.reset();
        return console.log('OK');
      }
    // }; //เปิดถ้าใช้อัพไฟล์เปิดบรรทัดนี้ ***
    // form.reset();
  }
}

// Function to get get form values
function getInputValue(id) {
  return document.getElementById(id).value;
}

// Create result table
function createResultTable(newxx, nameu, naw) {
  document.getElementById(
    'result'
  ).innerHTML = `<!-- Add Table Data wiht Script -->
            <table class="responsive-table">
              <thead>
                <tr>
                  <th>รหัสนักเรียน</th>
                  <th>ชื่อ</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>${newxx}</td>
                  <td>${nameu}</td>
				  <td>${naw}</td>
                </tr>
              </tbody>
            </table>
            <div class="red-text">
              <p>*บันทึกข้อมูลแล้ว</p>
              <p>
                **สำหรับพิจารณาข้อมูลเบื้องต้นไม่สามารถนำไปอ้างอิงรายการอื่นๆได้
              </p>
            </div>`;
}

// Creat flex message
function createFlexMessage(newxx, nameu) {
  // Using flex message simulator for json
  let flexJson = {
    type: 'text',

    text: `ลงทะเบียนฝึกงาน! ${newxx} ชื่อ : ${nameu}`,
  };
  return [flexJson];
}

// show image
//อัพรูปเปิดกลุ่มนี้
// document.getElementById('files1').onchange = function () {
//   var reader = new FileReader();
//   reader.onload = function (e) {
//     document.getElementById('image1').src = e.target.result;
//     $('#image1').show();
//     files1.dataURL = e.target.result;
//     files1.name = document.getElementById('files1').files[0].name;
//     console.log(files1);
//     document.getElementById('image1').setAttribute('width', 100); // เพิ่มให้แสดงภาพ
//   };
//   reader.readAsDataURL(this.files[0]);
// };

document.getElementById('xxd').onchange = function () {
  myFunction();
};

function myFunction() {
  loadingStart();
  var idchk = document.getElementById('xxd').value;
  const url =
    'https://script.google.com/macros/s/AKfycbz3aXQ50sSzmd_0wi-UEOtIGXpchAloaM8LfZw-y5gjgBdTBCQ/exec';
  fetch(url)
    .then((d) => d.json())
    .then((d) => {
      console.log(d['data'].length);
      console.log('raedy');

      var xx = d.data;
      console.log(xx);
      // var filterx = xx.forEach(r => {console.log(r['id'])});
      var filterx = xx.filter((r) => {
        return r['id'] === idchk;
      });
      // console.log('ที่ได้');
      console.log(filterx);
      // console.log(filterx[0]['id']);
      if (filterx.length === 0) {
        document.getElementById('name').value = '';
        document.getElementById('class').value = '';
        document.getElementById('year').value = '';
        document.getElementById('room').value = '';
        document.getElementById('major').value = '';
        document.getElementById('xxd').focus();
        alert('ไม่มีรหัสประจำตัวนี้ในระบบ กรุณาติดต่อเจ้าหน้าที่');
        loadingEnd();
        return false;
      }
      document.getElementById('name').value = filterx[0]['name'];
      document.getElementById('class').value = filterx[0]['class'];
      document.getElementById('year').value = filterx[0]['year'];
      document.getElementById('room').value = filterx[0]['room'];
      document.getElementById('major').value = filterx[0]['major'];
      loadingEnd();

      // for (var i = 0; i < d['data'].length; i++) {
      //   if (d['data'][i]['id'] === idchk) {
      //     console.log(d['data'][i]['name']);
      //     var r_name = d['data'][i]['name'];
      //     var r_class = d['data'][i]['class'];
      //     var r_year = d['data'][i]['year'];
      //     var r_room = d['data'][i]['room'];
      //     var r_major = d['data'][i]['major'];
      //     // var r_tel1 = d['data'][i]['tel1'];
      //     // var r_tel2 = d['data'][i]['tel2'];
      //     document.getElementById('name').value = r_name;
      //     document.getElementById('class').value = r_class;
      //     document.getElementById('year').value = r_year;
      //     document.getElementById('room').value = r_room;
      //     document.getElementById('major').value = r_major;
      //     // document.getElementById('new').value = r_tel1;
      //     // document.getElementById('tel2').value = r_tel2;
      //   }
      // }
    });
}

// window.addEventListener('DOMContentLoaded', myFunction());
function loadingStart() {
  document.getElementById('loading').classList.remove('d-none');
}

function loadingEnd() {
  document.getElementById('loading').classList.add('d-none');
}
