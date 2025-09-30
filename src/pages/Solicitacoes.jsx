import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';

import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';

import { Bell, User, Clock, CheckCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';

export const Solicitacoes = () => {
  const { user } = useAuth();
  const storageKey = `requests_${user.id}`;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingRequests, setProcessingRequests] = useState(new Set());

  // Estado para modal de confirmação
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    loadRequests();
  }, [user.id]);

  /**
   * Carregar solicitações com suporte offline
   */
  const loadRequests = async () => {
    setLoading(true);

    try {
      const data = await mockApi.getRequests(user.id);
      const pendingRequests = data.filter(req => req.status === 'pendente');
      setRequests(pendingRequests);

      // Salva no localStorage
      localStorage.setItem(storageKey, JSON.stringify(pendingRequests));
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);

      const cached = localStorage.getItem(storageKey);
      if (cached) {
        setRequests(JSON.parse(cached));
        toast('📴 Modo offline: exibindo dados salvos', { icon: '📴' });
      } else {
        setRequests([]);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Aceitar solicitação
   */
  const handleAcceptRequest = async (requestId, requestData) => {
    setProcessingRequests(prev => new Set([...prev, requestId]));

    try {
      const existingPatients = await mockApi.getPatients(user.id);
      const duplicatePatient = existingPatients.find(p => p.email === requestData.patientEmail);

      if (duplicatePatient) {
        toast.error('Este paciente já está cadastrado em sua lista!');
        return;
      }

      await mockApi.createPatient({
        name: requestData.patientName,
        email: requestData.patientEmail,
        phone: requestData.patientPhone,
        birthDate: '1990-01-01',
        age: 30,
        status: 'Ativo',
        psychologistId: user.id
      });

      await mockApi.updateRequestStatus(requestId, 'aceito', 'Paciente aceito e cadastrado no sistema');

      const updatedRequests = requests.filter(req => req.id !== requestId);
      setRequests(updatedRequests);

      localStorage.setItem(storageKey, JSON.stringify(updatedRequests));
      toast.success('Solicitação aceita! Paciente adicionado à sua lista.');
    } catch (error) {
      console.error('Erro ao aceitar solicitação:', error);
      toast.error('Erro ao processar solicitação');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  /**
   * Abrir modal de confirmação para rejeitar
   */
  const confirmReject = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  /**
   * Confirmar rejeição
   */
  const handleRejectRequest = async () => {
    if (!selectedRequest) return;

    const requestId = selectedRequest.id;
    setProcessingRequests(prev => new Set([...prev, requestId]));

    try {
      await mockApi.updateRequestStatus(requestId, 'rejeitado', 'Solicitação rejeitada pelo psicólogo');

      const updatedRequests = requests.filter(req => req.id !== requestId);
      setRequests(updatedRequests);

      localStorage.setItem(storageKey, JSON.stringify(updatedRequests));

      toast.success('Solicitação rejeitada.');
      setShowModal(false); // Fecha o modal após rejeitar
    } catch (error) {
      console.error('Erro ao rejeitar solicitação:', error);
      toast.error('Erro ao processar solicitação');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  /**
   * Cores para os badges
   */
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'aceito': return 'bg-green-100 text-green-800';
      case 'rejeitado': return 'bg-red-100 text-red-800';
      case 'pendente': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      {/* Título */}
      <div className="flex items-center gap-3">
        <Bell className="w-8 h-8 text-light" />
        <h1 className="text-3xl font-bold text-dark">Solicitações de Pacientes</h1>
      </div>

      {/* Cards de solicitações */}
      <div className="grid gap-6">
        {requests.length === 0 ? (
          <Card className="text-center py-12">
            <Bell className="w-16 h-16 text-dark/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dark mb-2">Nenhuma solicitação encontrada</h3>
            <p className="text-dark/70">As solicitações de novos pacientes aparecerão aqui.</p>
          </Card>
        ) : (
          requests.map(request => (
            <Card
              key={request.id}
              className="space-y-4 shadow-lg border border-gray-100 rounded-2xl p-4 bg-white"
            >
              {/* Cabeçalho */}
              <div className="flex justify-between items-start">
                {/* Nome + Contato */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-light to-accent rounded-full flex items-center justify-center text-white font-bold">
                    {request.patientName[0]} {/* Primeira letra do nome */}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark">{request.patientName}</h3>
                    <p className="text-sm text-gray-600">{request.patientEmail}</p>
                    <p className="text-sm text-gray-600">{request.patientPhone}</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-col gap-2 items-end">
                  <span
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}
                  >
                    {request.urgency === 'alta'
                      ? 'Alta urgência'
                      : request.urgency === 'media'
                      ? 'Média urgência'
                      : 'Baixa urgência'}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                  >
                    {request.status === 'pendente'
                      ? 'Pendente'
                      : request.status === 'aceito'
                      ? 'Aceito'
                      : 'Rejeitado'}
                  </span>
                </div>
              </div>

              {/* Descrição */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium text-dark mb-1">Descrição da necessidade:</h4>
                <p className="text-gray-700 text-sm">{request.description}</p>
              </div>

              {/* Data */}
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                Enviado em {new Date(request.createdAt).toLocaleDateString('pt-BR')}
              </div>

              {/* Botões de ação */}
              <div className="flex flex-col md:flex-row gap-3">
                <Button
                  variant="secondary"
                  onClick={() => confirmReject(request)}
                  loading={processingRequests.has(request.id)}
                  className="flex-1 flex items-center justify-center gap-2 border border-red-500 text-red-500 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                  Rejeitar
                </Button>

                <Button
                  onClick={() => handleAcceptRequest(request.id, request)}
                  loading={processingRequests.has(request.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-darkness"
                >
                  <CheckCircle className="w-4 h-4" />
                  Aceitar como Paciente
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Modal de confirmação de rejeição */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96 text-center">
            <h2 className="text-xl font-semibold text-dark mb-4">Confirmar rejeição</h2>
            <p className="text-dark/70 mb-6">
              Tem certeza que deseja <strong className="text-red-600">rejeitar</strong> a solicitação de{' '}
              <strong>{selectedRequest?.patientName}</strong>?<br />
              Esta ação <strong>não poderá ser desfeita</strong>.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleRejectRequest}
                loading={processingRequests.has(selectedRequest?.id)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
