import { Component, OnInit } from '@angular/core';
import { SignUpModel } from 'src/app/models/signup-models';
import { TitleTextModel } from 'src/app/models/title-text-model';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public step: any = 0;
  public togglePassword = false;
  public configField: SignUpModel[];
  public leftSideStep!: TitleTextModel;
  public rightSideStep!: TitleTextModel;
  public kinderGardenData: any;
  public ownerData: any;
  public directorData: any;

  constructor(private callApiService: CallApiService) {
    this.configField = [
      {
        leftSideStep: {
          title: 'Vrtic',
          text: 'Unesite podatke o vrticu',
        },
        rightSideStep: {
          title: 'Podaci o vrticu',
          text: 'Unesite podatke o vasem vrticu',
        },
        form: {
          config: [
            {
              type: 'textbox',
              width: 'col-md-12',
              name: 'kindergarden-name',
              label: 'Ime vrtica',
              field: 'kindergarden-name',
            },
            {
              type: 'textbox',
              width: 'col-md-4',
              name: 'address',
              label: 'Adresa',
              field: 'address',
            },
            {
              type: 'textbox',
              width: 'col-md-4',
              name: 'city',
              label: 'Grad',
              field: 'city',
            },
            {
              type: 'textbox',
              width: 'col-md-4',
              name: 'zipCode',
              label: 'Postanski broj',
              field: 'zipCode',
            },
            {
              type: 'textbox',
              width: 'col-md-6',
              name: 'number',
              label: 'Broj telefona vrtica',
              field: 'number',
            },
            {
              type: 'textbox',
              width: 'col-md-6',
              name: 'pib',
              label: 'PIB',
              field: 'pib',
            },
            {
              type: 'button',
              width: 'col-md-12',
              class: 'e-info',
              name: 'submit',
              label: 'changePasswordButton',
              field: 'submit',
              positionClass: 'position-end mt-3 col-md-12',
            },
          ],
        },
      },
      {
        leftSideStep: {
          title: 'Vlasnik',
          text: 'Unesite podatke o vlasniku vrtica',
        },
        rightSideStep: {
          title: 'Podaci o vlasniku',
          text: 'Unesite podatke o vlasniku',
        },
        form: {
          config: [
            {
              type: 'textbox',
              width: 'col-md-6',
              name: 'owner-firstname',
              label: 'Ime',
              field: 'owner-firstname',
            },
            {
              type: 'textbox',
              width: 'col-md-6',
              name: 'owner-lastname',
              label: 'prezime',
              field: 'owner-lastname',
            },
            {
              type: 'textbox',
              width: 'col-md-4',
              name: 'address',
              label: 'Adresa',
              field: 'address',
            },
            {
              type: 'textbox',
              width: 'col-md-4',
              name: 'city',
              label: 'Grad',
              field: 'city',
            },
            {
              type: 'textbox',
              width: 'col-md-4',
              name: 'zipCode',
              label: 'Postanski broj',
              field: 'zipCode',
            },
            {
              type: 'textbox',
              width: 'col-md-12',
              name: 'number',
              label: 'Broj telefona vrtica',
              field: 'number',
            },
            {
              type: 'textbox',
              width: 'col-md-6',
              name: 'email',
              label: 'Email',
              field: 'email',
            },
            {
              type: 'password',
              width: 'col-md-6',
              name: 'password',
              label: 'Lozinka',
              field: 'password',
            },
            {
              type: 'button',
              width: 'col-md-12',
              class: 'e-info',
              name: 'submit',
              label: 'changePasswordButton',
              field: 'submit',
              positionClass: 'position-end mt-3 col-md-12',
            },
          ],
        },
      },
      {
        leftSideStep: {
          title: 'Direktor',
          text: 'Unesite podatke o direktoru vrtica',
        },
        rightSideStep: {
          title: 'Podaci o direktoru',
          text: 'Unesite podatke o direktoru',
        },
        form: {
          config: [
            {
              type: 'textbox',
              width: 'col-md-6',
              name: 'owner-firstname',
              label: 'Ime',
              field: 'owner-firstname',
            },
            {
              type: 'textbox',
              width: 'col-md-6',
              name: 'owner-lastname',
              label: 'prezime',
              field: 'owner-lastname',
            },
            {
              type: 'textbox',
              width: 'col-md-4',
              name: 'address',
              label: 'Adresa',
              field: 'address',
            },
            {
              type: 'textbox',
              width: 'col-md-4',
              name: 'city',
              label: 'Grad',
              field: 'city',
            },
            {
              type: 'textbox',
              width: 'col-md-4',
              name: 'zipCode',
              label: 'Postanski broj',
              field: 'zipCode',
            },
            {
              type: 'textbox',
              width: 'col-md-12',
              name: 'number',
              label: 'Broj telefona vrtica',
              field: 'number',
            },
            {
              type: 'textbox',
              width: 'col-md-6',
              name: 'email',
              label: 'Email',
              field: 'email',
            },
            {
              type: 'password',
              width: 'col-md-6',
              name: 'password',
              label: 'Lozinka',
              field: 'password',
            },
            {
              type: 'button',
              width: 'col-md-12',
              class: 'e-info',
              name: 'submit',
              label: 'changePasswordButton',
              field: 'submit',
              positionClass: 'position-end mt-3 col-md-12',
            },
          ],
        },
      },
    ];
    this.setLeftAndRightSideCurrentStep();
  }

  setLeftAndRightSideCurrentStep() {
    this.leftSideStep = {
      title: this.configField[this.step].leftSideStep?.title,
      text: this.configField[this.step].leftSideStep?.text,
    };

    this.rightSideStep = {
      title: this.configField[this.step].rightSideStep?.title,
      text: this.configField[this.step].rightSideStep?.text,
    };
  }

  ngOnInit(): void {}

  setStep(i: any) {
    this.step = i;
  }

  goPrevious() {
    this.step--;
    this.setLeftAndRightSideCurrentStep();
  }

  goNext() {
    this.step++;
    if (this.step < 3) {
      this.setLeftAndRightSideCurrentStep();
    }
  }

  tooglePasswordChange() {
    this.togglePassword = !this.togglePassword;
  }

  submitData(event: any) {
    console.log(event);
    if (this.step === 0) {
      this.kinderGardenData = event;
    } else if (this.step === 1) {
      this.ownerData = event;
    } else if (this.step === 2) {
      this.directorData = event;
      this.createAccountForKinderGarden();
    }
    this.goNext();
  }

  createAccountForKinderGarden() {
    const data = {
      kindergarde: this.kinderGardenData,
      owner: this.ownerData,
      director: this.directorData,
    };
    this.callApiService
      .callPostMethod('api/createAccountForKinderGarden', data)
      .subscribe((data) => {
        if (data) {
        } else {
        }
      });
  }
}
