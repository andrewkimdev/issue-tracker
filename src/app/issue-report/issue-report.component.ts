import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent {
  @Output() formClose = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private issuesService: IssuesService,
  ) {}

  issueForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    priority: ['', Validators.required],
    type: ['', Validators.required],
  });

  addIssue() {
    if (this.issueForm.invalid) {
      this.issueForm.markAllAsTouched(); // To make validation messages appear everywhere.
      return;
    }
    const issue = this.issueForm.value;

    this.issuesService.createIssue(issue);
    this.formClose.emit();
  }
}
