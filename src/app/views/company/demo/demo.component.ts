
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms'
import * as XLSX from 'xlsx';
import { ContactService, CountryService, AlertService } from '../../../_services'
import { ConfirmationServiceService } from '../../../_services/confirmation-service.service';

@Component({
  templateUrl: './demo.component.html',
  selector: 'app-demo',
  styleUrls: ['./demo.component.scss']
})

export class DemoComponent {
  showSpinner = false;
  contactForm: FormGroup;
  OptionValue: any;
  willDownload = false;
  JsonData = { Sheet1: <any>[] };
  value: any = '';
  newSelectItem: any = [];
  newSlectedVale: any = [];
  newString: any;
  intervalId;
  apiData: any;
  keyvalue: String = '';
  check: any = '';
  textarea: any = '';
  select: any = '';
  data = [];
  arr: any = [];
  spinnerEnabled = false;
  i: number = 0;
  keys: string[];
  super: any = [];
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
  disableTextbox = false;
  returnData: any = [];
  percent: number = 0
  percentage: number = 0
  message: String = "";
  noOfcount: number = 0;
  p: number = 0;
  z: number = 0;


  // constructor 
    constructor(private getData: CountryService,
    private CS: ContactService,
    private alertService: AlertService,
    private confirmationDialogService: ConfirmationServiceService) { }

  // array of all fields
  addContact = ['Coantact Type', 'Add Profile', 'Prefix', 'First Name', 'Middle Name', 'Last Name', 'Suffix', 'Preferred Name', 'Gender', 'Date of Birth', 'Email', 'Email Type', 'On Hold', 'Bulk Mailings', 'Select Your Id Type', 'Enter Id No', 'Current Employer', 'Job Title', 'Additional Info', 'Phone', 'Contact Location', 'Instant Messenger', 'IM Location', 'IM Type', 'Social Media Name', 'Username', 'Website', 'Referral Contact', 'Referral ID', 'Testimonials', 'Add Professional Certificates', 'Employee Status', 'Convenient Time for reaching out to you', 'Level Education', 'Favorite Colour', 'Most Preferred Holiday Destination', 'Favorites Brands', 'Favorite leisure time Activities', 'Most Used Apps', 'Favorite Sites', 'Preferred social Media Platform', 'Native Place', 'Languages known', 'Favorite Niche', 'Preferred Shopping Method', 'Shopping websites preferred other than us', 'Religion', 'Food Type preferred', 'Workout Type preferred', 'Blood Group', 'Charities Related to', 'Close to heart social services', 'Most Important Issue', 'Martial Status', 'Marriage Anniversary Date', 'Family Strength', 'Relation', 'Name', 'Age', 'Working or Dependent', 'Phone Number', 'Search Current Address', 'Address Type', 'Primary location for this contact', 'Billing location for this contact', 'Use another contacts address', 'Unit Number', 'Street Number', 'Street Name', 'Street Type', 'Country', 'Select Timezone', 'State', 'City', 'Postal Code', 'Communication Style', 'Salutation Type', 'Privacy', 'Preferred Communication Method', 'Preferred Language', 'Email Format', 'NO BULK EMAILS', 'Tag', 'Group', 'Reference From'];

  // disable select filed
  toggleDisable(e, val) {
    console.log(val);
    if (e.target.checked) {
      (document.getElementById(`select-${val}`) as HTMLInputElement).setAttribute("disabled", "disabled")
    } else {
      (document.getElementById(`select-${val}`) as HTMLInputElement).removeAttribute("disabled")
    }
  }

  // add multiple contact
  onSubmit() {
    this.arr = [];
    this.p = 0; this.z = 0;
    for (this.i; this.i <= this.addContact.length - 1; this.i++) {
      this.data = [];
      this.keyvalue = ((document.getElementById(`key-${this.addContact[this.i]}`) as HTMLInputElement).value);
      this.check = ((document.getElementById(`check-${this.addContact[this.i]}`) as HTMLInputElement).checked);
      this.select = ((document.getElementById(`select-${this.addContact[this.i]}`) as HTMLInputElement).value);
      this.textarea = ((document.getElementById(`textarea-${this.addContact[this.i]}`) as HTMLInputElement).value);

      if (this.check) {
        this.super.push(this.textarea);
      } else {
        this.super.push(this.select);
      }
    }

    for (let j = 0; j <= this.JsonData.Sheet1.length - 1; j++) {
      this.newString = "";
      this.i = 0;
      for (this.i; this.i <= this.super.length - 1; this.i++) {
        this.data = [];
        if (this.JsonData.Sheet1[j].hasOwnProperty(this.super[this.i])) {
          let item;
          item = this.JsonData.Sheet1[j][this.super[this.i]];
          this.data.push(item);
        } else if (this.super[this.i] !== "") {
          let item;
          item = this.super[this.i];
          this.data.push(item);
        }
        if (this.super[this.i].value == undefined) {
          let item = "";
          item = this.super[this.i];
          this.data.push(item);
        }
        let keyvalue = ((document.getElementById(`key-${this.addContact[this.i]}`) as HTMLInputElement).value);
        this.newString += `"` + keyvalue.split(" ").join("") + `"` + `:"` + this.data + `",`;
      }
      this.arr.push(JSON.parse("{" + this.newString.substring(0, this.newString.length - 1) + "}"));
    }
    clearInterval(this.intervalId);
    this.noOfcount = this.arr.length;

    // conditions
    const isBelowThreshold = (currentValue) => currentValue == [];
    if (this.arr.every(isBelowThreshold)) {
      alert('Please upload file and select value');
    } else {
      this.chunkArray(this.arr, (this.arr.length / 3))
    }
    if (this.p > 0) {
      alert("Please select value first")
    }
  }

  // create contact fun call service
  createContact(val: any) {
    for (let k = 0; k <= val.length - 1; k++) {
      let obj = Object.values(val[k]);
      let checknewArray = this.checkObject(obj);
      if (checknewArray) {
        this.z++
      }
    }
    if (this.z == 0) {
      this.p++
    } else {
      this.showSpinner = true;
      this.CS.create(val).subscribe(data => {
        this.percentage = Number(data["data"].length);
        this.percent = 100
        this.message = data['message'];
        this.inputFile.nativeElement.value = ''
        this.JsonData = { Sheet1: <any>[] }
        this.alertService.success(data['message'], true);
      },
        error => {
          if (error != "") {
            this.message = "Something went wrong!"
          } else {
            this.message = error;
          }
          this.percent = 0
          this.alertService.error(error);
          this.inputFile.nativeElement.value = '';
          this.JsonData = { Sheet1: <any>[] }
        });
    }
  }

  //  check array value
  checkObject(my_arr) {
    for (var i = 0; i < my_arr.length; i++) {
      if (my_arr[i] === "") {
        return false;
      } else {
        return true;
      }
    }
  }

  // loader close
  closeLoader() {
    this.showSpinner = false;
    console.log("function colled");
    console.log(this.showSpinner);
  }

  // send data in chunks
  chunkArray(array, size) {
    let result = []
    for (let value of array) {
      let lastArray = result[result.length - 1]
      if (!lastArray || lastArray.length == size) {
        result.push([value])
        this.createContact(this.arr)
      } else {
        lastArray.push(value)
      }
      this.arr = []
    } return result
  }


  // uploade excel file
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;

    const target: DataTransfer = <DataTransfer>(ev.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx|.csv)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }

    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      const reader = new FileReader();
      const file = ev.target.files[0];
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.getData.jsonData.Sheet1 = jsonData.Sheet1;
        this.getData.getJsonData().subscribe(data => this.JsonData.Sheet1 = data)
        console.log(this.JsonData.Sheet1);
      }
      reader.readAsBinaryString(file);
    }
    else {
      this.inputFile.nativeElement.value = '';
    }
  }

  //show PopUP Box
  public openConfirmationDialog() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
      .then((confirmed) => (this.onSubmit(), confirmed))
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}