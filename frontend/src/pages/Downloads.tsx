import { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Lock, Unlock, Download, FileText } from 'lucide-react';
import axios from 'axios';

const Downloads = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/verify', { password });
      setToken(response.data.token);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (token) {
      // In a real scenario we might fetch a blob, but window.open to the API with token works well for static files
      window.open(`/api/download/cv?token=${token}`, '_blank');
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-bgSecondary rounded-2xl border border-borderBase p-8 md:p-12 shadow-xl"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
              {token ? <Unlock className="w-8 h-8 text-accent" /> : <Lock className="w-8 h-8 text-accent" />}
            </div>
            <h1 className="text-3xl font-bold text-textPrimary mb-4">Protected Downloads</h1>
            <p className="text-textSecondary">
              {token
                ? "Access granted. You can now download the requested files."
                : "Please enter the access password to download my complete CV and references."}
            </p>
          </div>

          {!token ? (
            <form onSubmit={handleVerify} className="max-w-md mx-auto">
              <div className="mb-6">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password (mypassword)"
                  className="w-full px-4 py-3 rounded-lg bg-bgPrimary border border-borderBase text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent transition-shadow text-center tracking-widest"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !password}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-accent hover:bg-accentHover transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Unlock Files'}
              </button>
              {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto space-y-4"
            >
              <div className="p-4 bg-bgPrimary border border-borderBase rounded-lg flex items-center justify-between group">
                <div className="flex items-center">
                  <FileText className="w-6 h-6 text-accent mr-4" />
                  <div>
                    <p className="font-medium text-textPrimary">CV_Michael_Portmann.pdf</p>
                    <p className="text-sm text-textSecondary">PDF Document</p>
                  </div>
                </div>
                <button
                  onClick={handleDownload}
                  className="p-2 text-textSecondary hover:text-accent hover:bg-accent/10 rounded-full transition-colors"
                  title="Download"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-center text-textSecondary mt-6">
                Session active. Please do not share this file publicly.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Downloads;
