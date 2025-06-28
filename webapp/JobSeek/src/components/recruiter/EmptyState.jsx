import { Briefcase, Search } from 'lucide-react';
import Button from '../common/Button';

const EmptyState = ({ searchTerm}) => {
    return (
        <div className="text-center py-12">
            {searchTerm ? (
                <>
                    <Search className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        No jobs match your search for "{searchTerm}". Try adjusting your search.
                    </p>
                </>
            ) : (
                <>
                    <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs posted yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Get started by posting your first job opening.
                    </p>
                </>
            )}
        </div>
    );
};

export default EmptyState;