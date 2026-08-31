import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { StepGuideViewer } from '../components/guides/StepGuideViewer';
import { AccessibleButton } from '../components/ui/AccessibleButton';
import { GUIDES_DATA } from '../data/contentData';

export const GuideDetail: React.FC = () => {
  const { guideId } = useParams<{ guideId: string }>();
  const navigate = useNavigate();

  const guide = GUIDES_DATA.find((g) => g.id === guideId) || GUIDES_DATA[0];

  return (
    <PageWrapper
      title={guide.title}
      subtitle="Follow each illustrated step below at your own pace. You can tap the listen button to hear instructions read out loud."
      badge="Interactive Step-by-Step Guide"
      breadcrumbs={[
        { label: 'Guides', path: '/guides' },
        { label: guide.title },
      ]}
      actions={
        <AccessibleButton
          variant="secondary"
          size="sm"
          onClick={() => navigate('/guides')}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          All Guides
        </AccessibleButton>
      }
    >
      <div className="py-4">
        <StepGuideViewer guide={guide} />
      </div>
    </PageWrapper>
  );
};
