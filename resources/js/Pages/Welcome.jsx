
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome - Balance Sheet App" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:justify-center lg:col-start-2">
                                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                                    Balance Sheet App
                                </h1>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="flex items-center">
                                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                        Manage Your Assets
                                                    </h2>
                                                </div>
                                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                                    Track your assets including bank accounts, investments, property, and more.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="flex items-center">
                                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                        Track Your Liabilities
                                                    </h2>
                                                </div>
                                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                                    Monitor your debts, loans, and financial obligations.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="flex items-center">
                                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                        Calculate Net Worth
                                                    </h2>
                                                </div>
                                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                                    Get real-time calculations of your financial position.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="flex items-center">
                                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                        Printable Reports
                                                    </h2>
                                                </div>
                                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                                    Generate clean, printable balance sheet summaries.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Balance Sheet App - Built with Laravel {laravelVersion} & PHP {phpVersion}
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
