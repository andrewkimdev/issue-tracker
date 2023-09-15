import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IssuesService } from '../issues.service';

import { Issue } from '../issue';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit, OnDestroy {
  @Output() formClose = new EventEmitter<void>();

  suggestions: Issue[] = [];
  private destroy$ = new Subject<void>();

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

  ngOnInit() {
    this.activateTitleSuggestion();
  }

  private activateTitleSuggestion(): void {
    this.issueForm.controls['title'].valueChanges.pipe(
      takeUntil(this.destroy$),
      tap((title) => this.suggestions = this.issuesService.getSuggestions(title)),
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
