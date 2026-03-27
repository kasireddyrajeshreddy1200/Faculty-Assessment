import { useNavigate } from 'react-router-dom';

const ContributionCard = ({ contribution, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const getCategoryIcon = (category) => {
    const icons = {
      TEACHING: '🎓',
      RESEARCH: '🔬',
      ADMINISTRATION: '📋',
      EXTENSION: '📚',
    };
    return icons[category] || '📌';
  };

  const getCategoryColor = (category) => {
    const colors = {
      TEACHING: 'from-emerald-500 to-emerald-600',
      RESEARCH: 'from-blue-500 to-blue-600',
      ADMINISTRATION: 'from-purple-500 to-purple-600',
      EXTENSION: 'from-orange-500 to-orange-600',
    };
    return colors[category] || 'from-indigo-500 to-indigo-600';
  };

  const getStatusBadgeClass = (status) => {
    const badges = {
      PENDING: 'badge-warning',
      APPROVED: 'badge-success',
      REJECTED: 'badge-danger',
      EVALUATED: 'badge-primary',
    };
    return badges[status] || 'badge-primary';
  };

  return (
    <div className="card group hover:shadow-xl transition-all duration-300 animate-slide-in-up overflow-hidden relative">
      {/* Gradient header */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getCategoryColor(contribution.category)}`}></div>

      {/* Header with icon and category */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(contribution.category)} rounded-lg flex items-center justify-center text-2xl shadow-lg`}>
            {getCategoryIcon(contribution.category)}
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 text-lg group-hover:text-primary-600 transition-colors">
              {contribution.title}
            </h3>
            <p className="text-sm text-neutral-500">{contribution.category}</p>
          </div>
        </div>

        <div className={`badge ${getStatusBadgeClass(contribution.status)}`}>
          {contribution.status}
        </div>
      </div>

      {/* Description */}
      {contribution.description && (
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
          {contribution.description}
        </p>
      )}

      {/* Meta information */}
      <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-y border-neutral-100">
        <div>
          <p className="text-xs text-neutral-500 uppercase tracking-wide">Academic Year</p>
          <p className="font-semibold text-neutral-900">{contribution.academicYear}</p>
        </div>
        <div>
          <p className="text-xs text-neutral-500 uppercase tracking-wide">Score</p>
          <p className={`font-bold text-lg ${contribution.score ? 'text-success-600' : 'text-neutral-400'}`}>
            {contribution.score || '-'}
          </p>
        </div>
      </div>

      {/* Proof files indicator */}
      {contribution.proofFiles && contribution.proofFiles.length > 0 && (
        <div className="mb-4 flex items-center gap-2 text-sm text-neutral-600">
          <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 16.5a1 1 0 11-2 0 1 1 0 012 0zM15 7a2 2 0 11-4 0 2 2 0 014 0zM12.5 1a1.5 1.5 0 00-3 0v1.6a4 4 0 00.8 2.4L8 7.5a1 1 0 000 1.414l2.3 2.3a4 4 0 002.4.8h1.6a1.5 1.5 0 000-3h-1.6a2 2 0 01-1.414-.586L10 9.414 7.707 7.12a4 4 0 01.8-2.4V1z" />
          </svg>
          {contribution.proofFiles.length} file{contribution.proofFiles.length > 1 ? 's' : ''} attached
        </div>
      )}

      {/* Actions */}
      {contribution.status === 'PENDING' && (
        <div className="flex gap-2 pt-4 border-t border-neutral-100">
          <button
            onClick={() => onEdit(contribution._id)}
            className="flex-1 btn btn-sm btn-primary flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            onClick={() => onDelete(contribution._id)}
            className="flex-1 btn btn-sm btn-danger flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ContributionCard;
