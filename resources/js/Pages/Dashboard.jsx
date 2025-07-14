import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, assets, liabilities, summary }) {
    const [showAssetForm, setShowAssetForm] = useState(false);
    const [showLiabilityForm, setShowLiabilityForm] = useState(false);

    const assetForm = useForm({
        name: '',
        amount: '',
        description: ''
    });

    const liabilityForm = useForm({
        name: '',
        amount: '',
        description: ''
    });

    const submitAsset = (e) => {
        e.preventDefault();
        assetForm.post('/assets', {
            onSuccess: () => {
                assetForm.reset();
                setShowAssetForm(false);
            }
        });
    };

    const submitLiability = (e) => {
        e.preventDefault();
        liabilityForm.post('/liabilities', {
            onSuccess: () => {
                liabilityForm.reset();
                setShowLiabilityForm(false);
            }
        });
    };

    const deleteAsset = (id) => {
        if (confirm('Are you sure you want to delete this asset?')) {
            useForm().delete(`/assets/${id}`);
        }
    };

    const deleteLiability = (id) => {
        if (confirm('Are you sure you want to delete this liability?')) {
            useForm().delete(`/liabilities/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Balance Sheet</h2>}
        >
            <Head title="Balance Sheet" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-center">
                                <h3 className="text-lg font-medium text-gray-900">Total Assets</h3>
                                <p className="text-3xl font-bold text-green-600">
                                    KES {summary.totalAssets.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-center">
                                <h3 className="text-lg font-medium text-gray-900">Total Liabilities</h3>
                                <p className="text-3xl font-bold text-red-600">
                                    KES {summary.totalLiabilities.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-center">
                                <h3 className="text-lg font-medium text-gray-900">Net Worth</h3>
                                <p className={`text-3xl font-bold ${summary.netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    KES {summary.netWorth.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Assets Section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Assets</h3>
                                    <button
                                        onClick={() => setShowAssetForm(!showAssetForm)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                                    >
                                        {showAssetForm ? 'Cancel' : 'Add Asset'}
                                    </button>
                                </div>

                                {showAssetForm && (
                                    <form onSubmit={submitAsset} className="mb-4 p-4 border rounded-md">
                                        <div className="grid grid-cols-1 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Asset Name"
                                                value={assetForm.data.name}
                                                onChange={(e) => assetForm.setData('name', e.target.value)}
                                                className="w-full border rounded-md px-3 py-2"
                                                required
                                            />
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="Amount (KES)"
                                                value={assetForm.data.amount}
                                                onChange={(e) => assetForm.setData('amount', e.target.value)}
                                                className="w-full border rounded-md px-3 py-2"
                                                required
                                            />
                                            <textarea
                                                placeholder="Description (optional)"
                                                value={assetForm.data.description}
                                                onChange={(e) => assetForm.setData('description', e.target.value)}
                                                className="w-full border rounded-md px-3 py-2"
                                                rows="2"
                                            />
                                            <button
                                                type="submit"
                                                disabled={assetForm.processing}
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                                            >
                                                {assetForm.processing ? 'Adding...' : 'Add Asset'}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                <div className="space-y-2">
                                    {assets.length === 0 ? (
                                        <p className="text-gray-500 text-center py-4">No assets added yet</p>
                                    ) : (
                                        assets.map((asset) => (
                                            <div key={asset.id} className="flex justify-between items-center p-3 border rounded-md">
                                                <div>
                                                    <h4 className="font-medium">{asset.name}</h4>
                                                    <p className="text-sm text-gray-600">KES {parseFloat(asset.amount).toLocaleString()}</p>
                                                    {asset.description && (
                                                        <p className="text-xs text-gray-500">{asset.description}</p>
                                                    )}
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={`/assets/${asset.id}/edit`}
                                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteAsset(asset.id)}
                                                        className="text-red-600 hover:text-red-800 text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Liabilities Section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Liabilities</h3>
                                    <button
                                        onClick={() => setShowLiabilityForm(!showLiabilityForm)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                                    >
                                        {showLiabilityForm ? 'Cancel' : 'Add Liability'}
                                    </button>
                                </div>

                                {showLiabilityForm && (
                                    <form onSubmit={submitLiability} className="mb-4 p-4 border rounded-md">
                                        <div className="grid grid-cols-1 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Liability Name"
                                                value={liabilityForm.data.name}
                                                onChange={(e) => liabilityForm.setData('name', e.target.value)}
                                                className="w-full border rounded-md px-3 py-2"
                                                required
                                            />
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="Amount (KES)"
                                                value={liabilityForm.data.amount}
                                                onChange={(e) => liabilityForm.setData('amount', e.target.value)}
                                                className="w-full border rounded-md px-3 py-2"
                                                required
                                            />
                                            <textarea
                                                placeholder="Description (optional)"
                                                value={liabilityForm.data.description}
                                                onChange={(e) => liabilityForm.setData('description', e.target.value)}
                                                className="w-full border rounded-md px-3 py-2"
                                                rows="2"
                                            />
                                            <button
                                                type="submit"
                                                disabled={liabilityForm.processing}
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                                            >
                                                {liabilityForm.processing ? 'Adding...' : 'Add Liability'}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                <div className="space-y-2">
                                    {liabilities.length === 0 ? (
                                        <p className="text-gray-500 text-center py-4">No liabilities added yet</p>
                                    ) : (
                                        liabilities.map((liability) => (
                                            <div key={liability.id} className="flex justify-between items-center p-3 border rounded-md">
                                                <div>
                                                    <h4 className="font-medium">{liability.name}</h4>
                                                    <p className="text-sm text-gray-600">KES {parseFloat(liability.amount).toLocaleString()}</p>
                                                    {liability.description && (
                                                        <p className="text-xs text-gray-500">{liability.description}</p>
                                                    )}
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={`/liabilities/${liability.id}/edit`}
                                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteLiability(liability.id)}
                                                        className="text-red-600 hover:text-red-800 text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Print Button */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => window.print()}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md"
                        >
                            Print Balance Sheet
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
