import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import OverviewTab    from './OverviewTab';
import TeamTab        from './TeamTab';
import SubmissionTab  from './SubmissionTab';
import ResourcesTab   from './ResourcesTab';
import ScheduleTab    from './ScheduleTab';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'overview'   && <OverviewTab />}
      {activeTab === 'team'       && <TeamTab />}
      {activeTab === 'submission' && <SubmissionTab />}
      {activeTab === 'resources'  && <ResourcesTab />}
      {activeTab === 'schedule'   && <ScheduleTab />}
    </DashboardLayout>
  );
}
