import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
})
export class ToastrComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  showSuccess(title: string, text?: string) {
    this.toastr.success(title, text, {
      timeOut: 7000,
      positionClass: 'toast-bottom-right',
    });
  }

  showInfo(title: string, text?: string) {
    this.toastr.info(title, text, {
      timeOut: 7000,
      positionClass: 'toast-bottom-right',
    });
  }

  showError(title: string, text?: string) {
    this.toastr.error(title, text, {
      timeOut: 7000,
      positionClass: 'toast-bottom-right',
    });
  }
  showWarning(title: string, text?: string) {
    this.toastr.warning(title, text, {
      timeOut: 7000,
      positionClass: 'toast-bottom-right',
    });
  }
}
